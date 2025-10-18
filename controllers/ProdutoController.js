import { getTenantSequelize } from '../config/database.js';
import { ProdutoModel } from '../models/produto.js';
import { ProdutoPrecoModel } from '../models/produtoPreco.js';

export const ProdutoController = {
  // 📦 Listar todos os produtos
  async list(req, res) {
    try {
      const { schema } = req;
      const tenantDB = getTenantSequelize(schema);

      const Produto = ProdutoModel(tenantDB);
      const produtos = await Produto.findAll();

      res.json(produtos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 🔍 Buscar produto por ID
  async getById(req, res) {
    try {
      const { schema } = req;
      const { id } = req.params;

      const tenantDB = getTenantSequelize(schema);
      const Produto = ProdutoModel(tenantDB);

      const produto = await Produto.findByPk(id);

      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

      res.json(produto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ➕ Criar novo produto
  async create(req, res) {
    try {
      const { schema } = req;
      const { descricao } = req.body;

      if (!descricao) return res.status(400).json({ error: 'Descrição é obrigatória' });

      const tenantDB = getTenantSequelize(schema);
      const Produto = ProdutoModel(tenantDB);

      const novoProduto = await Produto.create({ descricao });
      res.status(201).json(novoProduto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ✏️ Atualizar produto
  async update(req, res) {
    try {
      const { schema } = req;
      const { id } = req.params;
      const { descricao } = req.body;

      const tenantDB = getTenantSequelize(schema);
      const Produto = ProdutoModel(tenantDB);

      const produto = await Produto.findByPk(id);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

      await produto.update({ descricao });
      res.json(produto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ❌ Excluir produto
  async delete(req, res) {
    try {
      const { schema } = req;
      const { id } = req.params;

      const tenantDB = getTenantSequelize(schema);
      const Produto = ProdutoModel(tenantDB);

      const produto = await Produto.findByPk(id);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

      await produto.destroy();
      res.json({ message: 'Produto removido com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 💰 Listar histórico de preços
  async listPrecos(req, res) {
    try {
      const { schema } = req;
      const { id } = req.params;

      const tenantDB = getTenantSequelize(schema);
      const ProdutoPreco = ProdutoPrecoModel(tenantDB);

      const precos = await ProdutoPreco.findAll({
        where: { produto_id: id },
        order: [['data_inicial', 'DESC']],
      });

      res.json(precos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ➕ Cadastrar novo preço (e fechar o anterior)
  async addPreco(req, res) {
    try {
      const { schema } = req;
      const { id } = req.params; // produto_id
      const { valor, data_inicial } = req.body;

      if (!valor) return res.status(400).json({ error: 'Valor é obrigatório' });

      const tenantDB = getTenantSequelize(schema);
      const ProdutoPreco = ProdutoPrecoModel(tenantDB);

      // Fecha preço anterior
      await ProdutoPreco.update(
        { data_final: new Date() },
        { where: { produto_id: id, data_final: null } }
      );

      // Cria novo preço vigente
      const novoPreco = await ProdutoPreco.create({
        produto_id: id,
        data_inicial: data_inicial || new Date(),
        valor,
      });

      res.status(201).json(novoPreco);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

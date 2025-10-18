// controllers/ConsumoController.js
import { ConsumoModel } from '../models/consumo.js';
import { ProdutoPrecoModel } from '../models/produto_preco.js';
import { getTenantSequelize } from '../config/database.js';

export const ConsumoController = {
  async list(req, res) {
    try {
      const { schema } = req;
      const tenantDB = getTenantSequelize(schema);
      const Consumo = ConsumoModel(tenantDB);
      const consumos = await Consumo.findAll();
      res.json(consumos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { schema } = req;
      const tenantDB = getTenantSequelize(schema);
      const Consumo = ConsumoModel(tenantDB);
      const ProdutoPreco = ProdutoPrecoModel(tenantDB);

      const { cliente_id, produto_id, quantidade, data_consumo } = req.body;
      const data = data_consumo ? new Date(data_consumo) : new Date();

      // 🔎 Busca o preço vigente
      const preco = await ProdutoPreco.findOne({
        where: {
          produto_id,
          data_inicio: { [tenantDB.Sequelize.Op.lte]: data },
        },
        order: [['data_inicio', 'DESC']],
      });

      if (!preco) {
        return res
          .status(400)
          .json({ error: 'Nenhum preço encontrado para este produto na data informada.' });
      }

      const valor_unitario = preco.valor;
      const valor_total = (parseFloat(quantidade) * parseFloat(valor_unitario)).toFixed(2);

      const consumo = await Consumo.create({
        cliente_id,
        produto_id,
        quantidade,
        valor_unitario,
        valor_total,
        data_consumo: data,
      });

      res.json(consumo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};

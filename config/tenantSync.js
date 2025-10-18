// config/tenantSync.js
import { Sequelize } from 'sequelize';
import { ClienteModel } from '../models/cliente.js';
import { ProdutoModel } from '../models/produto.js';
import { ProdutoPrecoModel } from '../models/produto_preco.js';
import { ConsumoModel } from '../models/consumo.js';

/**
 * Cria todas as tabelas base dentro do schema do tenant.
 * @param {Sequelize} sequelizeInstância do Sequelize já conectada ao tenant
 * @param {string} schema Nome do schema do tenant (ex: tenant_8855cc58)
 */
export async function syncTenantSchema(sequelize, schema) {
  try {
    console.log(`🧩 Criando tabelas para o schema: ${schema}`);

    // Muda o search_path para o schema do tenant
    await sequelize.query(`SET search_path TO ${schema};`);

    // Inicializa os models no schema
    const Cliente = ClienteModel(sequelize);
    const Produto = ProdutoModel(sequelize);
    const ProdutoPreco = ProdutoPrecoModel(sequelize);
    const Consumo = ConsumoModel(sequelize);

    // Cria as tabelas (em ordem correta, respeitando dependências)
    await Cliente.sync();
    await Produto.sync();
    await ProdutoPreco.sync();
    await Consumo.sync();

    console.log(`✅ Schema ${schema} sincronizado com sucesso!`);
  } catch (err) {
    console.error(`❌ Erro ao sincronizar schema ${schema}:`, err.message);
    throw err;
  }
}

// config/tenantManager.js
import { Sequelize } from 'sequelize';
import { ClienteModel } from '../models/cliente.js';

export async function createTenantSchema(mainSequelize, tenantSchema) {
  try {
    // 🔹 Cria o schema no banco, se não existir
    await mainSequelize.query(`CREATE SCHEMA IF NOT EXISTS "${tenantSchema}"`);

    // 🔹 Cria conexão específica para o schema
    const tenantDB = new Sequelize(mainSequelize.config.database, mainSequelize.config.username, mainSequelize.config.password, {
      host: mainSequelize.config.host,
      dialect: 'postgres',
      port: mainSequelize.config.port,
      schema: tenantSchema,
      logging: false,
    });

    // 🔹 Inicializa o modelo Cliente no schema
    const Cliente = ClienteModel(tenantDB);

    // ⚙️ Cria a tabela automaticamente dentro do schema
    await tenantDB.sync({ force: false, schema: tenantSchema });

    console.log(`📦 Tabela clientes criada (ou existente) em ${tenantSchema}`);

    // 🔹 Cria cliente padrão usando o Sequelize (sem SQL manual)
    await Cliente.create({
      nome: 'Cliente Padrão',
      cpf: Math.floor(Math.random() * 10000000000).toString(),
    });

    console.log(`👤 Cliente padrão inserido no schema ${tenantSchema}`);

    // 🔹 Fecha a conexão desse schema
    await tenantDB.close();

    return tenantSchema;
  } catch (error) {
    console.error(`❌ Erro ao criar schema ${tenantSchema}:`, error.message);
    throw error;
  }
}

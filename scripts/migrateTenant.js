import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const schema = process.argv[2];
if (!schema) {
  console.error('❌ Informe o schema do tenant. Exemplo: npm run migrate:tenant tenant_8855cc58');
  process.exit(1);
}

console.log(`🏗️ Iniciando migrations no schema: ${schema}`);

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

try {
  await sequelize.authenticate();

  // 1️⃣ Cria schema se não existir
  await sequelize.createSchema(schema, { ifNotExists: true });
  console.log(`✅ Schema ${schema} pronto.`);

  // 2️⃣ Define search_path para o schema do tenant
  await sequelize.query(`SET search_path TO ${schema}, public;`);

  // 3️⃣ Configura o Umzug para armazenar metadados dentro do schema do tenant
  const umzug = new Umzug({
    migrations: {
      glob: path.resolve(__dirname, '../migrations/*.js'),
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
      tableName: 'SequelizeMeta',
      schema, // 👈 garante que os metadados fiquem no schema do tenant
    }),
    logger: console,
  });

  console.log(`🚀 Aplicando migrations em ${schema}...`);
  await umzug.up();

  console.log(`✅ Migrations aplicadas com sucesso no schema ${schema}`);
  process.exit(0);
} catch (err) {
  console.error('❌ Erro ao aplicar migrations:', err);
  process.exit(1);
}

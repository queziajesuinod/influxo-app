import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const getMainSequelize = () => {
  return new Sequelize(
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
};

export const getTenantSequelize = (schema) => {
  return new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      schema,
      logging: false,
    }
  );
};

// models/cliente.js
import { DataTypes } from 'sequelize';

export const ClienteModel = (sequelize) => {
  const Cliente = sequelize.define(
    'Cliente',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'clientes',
      timestamps: true,
      schema: sequelize.config.schema,
    }
  );

  return Cliente;
};

import { DataTypes } from 'sequelize';

export const UsuarioModel = (sequelize) => {
  return sequelize.define(
    'Usuario',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenant_schema: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'usuarios',
      schema: 'public', // 🔥 Sempre no schema global
      timestamps: true,
    }
  );
};

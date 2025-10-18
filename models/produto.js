import { DataTypes } from 'sequelize';

export const ProdutoModel = (sequelize) => {
  return sequelize.define(
    'Produto',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'produtos',
      schema: sequelize.options.schema, // 🔥 cria dentro do schema do tenant
      timestamps: true,
    }
  );
  ProdutoModel.hasMany(ProdutoPrecoModel, { foreignKey: 'produto_id' });
};

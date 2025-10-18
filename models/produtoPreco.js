import { DataTypes } from 'sequelize';

export const ProdutoPrecoModel = (sequelize) => {
  return sequelize.define(
    'ProdutoPreco',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      produto_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      data_inicial: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      data_final: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: 'produto_precos',
      schema: sequelize.options.schema,
      timestamps: true,
    }
  );
  ProdutoPrecoModel.belongsTo(ProdutoModel, { foreignKey: 'produto_id' });

};

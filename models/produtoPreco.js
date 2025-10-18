import { DataTypes } from 'sequelize';
import { ProdutoModel } from './produto.js'; // ✅ certifique-se do caminho correto

export const ProdutoPrecoModel = (sequelize) => {
  const ProdutoPreco = sequelize.define(
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
      schema: sequelize.options.schema, // 🔥 cria dentro do schema do tenant
      timestamps: true,
    }
  );

  // ✅ Define a relação ProdutoPreco → Produto
  ProdutoPreco.belongsTo(ProdutoModel(sequelize), {
    foreignKey: 'produto_id',
    as: 'produto',
  });

  return ProdutoPreco;
};

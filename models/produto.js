import { DataTypes } from 'sequelize';
import { ProdutoPrecoModel } from './produtoPreco.js'; // ✅ ajuste conforme o nome do arquivo

export const ProdutoModel = (sequelize) => {
  const Produto = sequelize.define(
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

  // ✅ associações (executadas antes do retorno)
  Produto.hasMany(ProdutoPrecoModel(sequelize), {
    foreignKey: 'produto_id',
    as: 'precos',
  });

  return Produto;
};

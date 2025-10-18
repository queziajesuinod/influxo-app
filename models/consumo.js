// models/consumo.js
import { DataTypes } from 'sequelize';
import { ClienteModel } from './cliente.js';
import { ProdutoModel } from './produto.js';

export const ConsumoModel = (sequelize) => {
  const Consumo = sequelize.define(
    'Consumo',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      data_consumo: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      quantidade: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1,
      },
      valor_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      cliente_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      produto_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: 'consumos',
      schema: sequelize.options.schema, // ✅ correto — pega o schema do tenant
      timestamps: true,
    }
  );

  // 🔗 Relacionamentos
  Consumo.belongsTo(ClienteModel(sequelize), {
    foreignKey: 'cliente_id',
    as: 'cliente',
  });

  Consumo.belongsTo(ProdutoModel(sequelize), {
    foreignKey: 'produto_id',
    as: 'produto',
  });

  return Consumo;
};

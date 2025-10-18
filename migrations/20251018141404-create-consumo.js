export async function up({ context: queryInterface }) {
  const { Sequelize } = queryInterface.sequelize;
  await queryInterface.createTable('consumos', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
    },
    cliente_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    preco_produto_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'precos_produto', key: 'id' },
      onDelete: 'CASCADE',
    },
    data_consumo: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('consumos');
}

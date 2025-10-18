export async function up({ context: queryInterface }) {
  const { Sequelize } = queryInterface.sequelize;
  await queryInterface.createTable('precos_produto', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
    },
    produto_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'produtos', key: 'id' },
      onDelete: 'CASCADE',
    },
    valor: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    data_inicio: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    data_fim: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: 'Se nulo, é o valor atual',
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
  await queryInterface.dropTable('precos_produto');
}

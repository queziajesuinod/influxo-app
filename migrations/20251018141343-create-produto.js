export async function up({ context: queryInterface }) {
  const { Sequelize } = queryInterface.sequelize;

  await queryInterface.createTable('produtos', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
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

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('produtos');
}

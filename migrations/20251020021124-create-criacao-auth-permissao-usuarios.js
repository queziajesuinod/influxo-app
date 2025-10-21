export async function up({ context: queryInterface }) {
  const { Sequelize } = queryInterface.sequelize;

  // Cria a tabela "Perfis"
  await queryInterface.createTable('perfis', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },
    descricao: {
      type: Sequelize.STRING,
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

  // Cria a tabela "Permissoes"
  await queryInterface.createTable('permissoes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },
    nome: {
      type: Sequelize.STRING,
    },
    descricao: {
      type: Sequelize.STRING,
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

  // Cria a tabela "Usuarios"
  await queryInterface.createTable('usuarios', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },
    nome: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    perfilId: {
      type: Sequelize.UUID,
      references: {
        model: 'perfis',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    passwordHash: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
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
  // Remove as tabelas em ordem inversa para manter a integridade referencial
  await queryInterface.dropTable('usuarios');
  await queryInterface.dropTable('permissoes');
  await queryInterface.dropTable('perfis');
}

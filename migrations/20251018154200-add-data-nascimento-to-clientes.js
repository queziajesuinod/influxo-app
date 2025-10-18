export async function up({ context: queryInterface }) {
  const { Sequelize } = queryInterface.sequelize;

  // 🔍 Busca todos os schemas do banco que começam com "tenant_"
  const schemas = (
    await queryInterface.sequelize.query(
      `SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'tenant_%';`
    )
  )[0].map((s) => s.schema_name);

  for (const schema of schemas) {
    console.log(`🚀 Adicionando coluna data_nascimento no schema: ${schema}`);

    try {
      await queryInterface.addColumn(
        { tableName: 'clientes', schema },
        'data_nascimento',
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
          comment: 'Data de nascimento do cliente',
        }
      );
    } catch (err) {
      console.error(`❌ Erro ao adicionar coluna em ${schema}:`, err.message);
    }
  }
}

export async function down({ context: queryInterface }) {
  // Mesmo processo para remover, caso precise desfazer
  const schemas = (
    await queryInterface.sequelize.query(
      `SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'tenant_%';`
    )
  )[0].map((s) => s.schema_name);

  for (const schema of schemas) {
    console.log(`🧹 Removendo coluna data_nascimento de ${schema}`);

    try {
      await queryInterface.removeColumn(
        { tableName: 'clientes', schema },
        'data_nascimento'
      );
    } catch (err) {
      console.error(`❌ Erro ao remover coluna em ${schema}:`, err.message);
    }
  }
}

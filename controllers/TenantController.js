// controllers/TenantController.js
import { createTenantSchema } from '../config/tenantManager.js';
import { getMainSequelize, getTenantSequelize } from '../config/database.js';
import { syncTenantSchema } from '../config/tenantSync.js';
import crypto from 'crypto';

export const TenantController = {
  async create(req, res) {
    try {
      const { name } = req.body;
      const id = crypto.randomUUID();
      const schema = `tenant_${id.replace(/-/g, '').slice(0, 8)}`;

      // Cria o schema
      const mainDB = getMainSequelize();
      await createTenantSchema(mainDB, schema);

      // Conecta ao schema
      const tenantDB = getTenantSequelize(schema);

      // Cria tabelas internas
      await syncTenantSchema(tenantDB, schema);

      res.json({ success: true, schema, message: `Tenant ${name} criado com sucesso!` });
    } catch (err) {
      console.error('Erro ao criar tenant:', err);
      res.status(500).json({ error: err.message });
    }
  },
};

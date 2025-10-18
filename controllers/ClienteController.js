import { getTenantSequelize } from '../config/database.js';
import { ClienteModel } from '../models/cliente.js';
export const ClienteController = {
  async list(req, res) {
    try {
      const { schema } = req.headers;
      const tenantDB = getTenantSequelize(schema);
      const Client = ClienteModel(tenantDB);
      const clients = await Client.findAll();
      res.json(clients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { schema } = req.headers;
      const tenantDB = getTenantSequelize(schema);
      const Client = ClienteModel(tenantDB);
      const client = await Client.create(req.body);
      res.json(client);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async importBatch(req, res) {
    try {
      const { schema } = req.headers;
      const { clientes } = req.body;

      if (!Array.isArray(clientes)) {
        return res.status(400).json({ error: 'O corpo da requisição deve conter um array "clientes".' });
      }

      const tenantDB = getTenantSequelize(schema);
      const Cliente = ClienteModel(tenantDB);

      const results = await tenantDB.transaction(async (t) => {
        const inserted = await Cliente.bulkCreate(clientes, { transaction: t });
        return inserted;
      });

      res.json({
        success: true,
        message: `${results.length} clientes importados com sucesso.`,
        clientes: results
      });
    } catch (err) {
      console.error('Erro ao importar clientes:', err);
      res.status(500).json({ error: err.message });
    }
  },
};

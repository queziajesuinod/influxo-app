import express from 'express';
import { TenantController } from '../controllers/TenantController.js';

export default function tenantRoutes(sequelize) {
  const router = express.Router();
  router.post('/', (req, res) => {
    req.sequelize = sequelize;
    TenantController.create(req, res);
  });
  return router;
}

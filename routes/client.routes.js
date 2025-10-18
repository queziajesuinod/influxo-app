import express from 'express';
import { ClientController } from '../controllers/ClientController.js';

export default function clientRoutes() {
  const router = express.Router();
  router.get('/', ClientController.list);
  router.post('/', ClientController.create);
  router.post('/import', ClientController.importBatch);

  return router;
}

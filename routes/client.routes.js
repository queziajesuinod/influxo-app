import express from 'express';
import { ClienteController } from '../controllers/ClienteController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

export default function clientRoutes() {
  const router = express.Router();
  router.get('/', ClienteController.list);
  router.post('/', ClienteController.create);
  router.post('/import', ClienteController.importBatch);

  return router;
}

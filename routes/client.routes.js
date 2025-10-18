import express from 'express';
import { ClientController } from '../controllers/ClientController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

export default function clientRoutes() {
  const router = express.Router();
  router.get('/', ClientController.list);
  router.post('/', ClientController.create);
  router.post('/import', ClientController.importBatch);

  return router;
}

// routes/consumo.routes.js
import express from 'express';
import { ConsumoController } from '../controllers/ConsumoController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

// Listar consumos
router.get('/', ConsumoController.list);

// Criar consumo (valor calculado automaticamente)
router.post('/', ConsumoController.create);

export default router;

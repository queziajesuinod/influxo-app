import express from 'express';
import { ProdutoController } from '../controllers/ProdutoController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// ⚙️ Todas as rotas de produtos exigem autenticação
router.use(authenticate);

// Rotas de produtos (sem o prefixo /produtos)
router.get('/', ProdutoController.list);
router.get('/:id', ProdutoController.getById);
router.post('/', ProdutoController.create);
router.put('/:id', ProdutoController.update);
router.delete('/:id', ProdutoController.delete);

// Histórico de preços
router.get('/:id/precos', ProdutoController.listPrecos);
router.post('/:id/precos', ProdutoController.addPreco);

export default router;

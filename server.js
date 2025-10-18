import express from 'express';
import { TenantController } from './controllers/TenantController.js';
import { AuthController } from './controllers/AuthController.js';

import { authenticate } from './middlewares/authMiddleware.js';
import produtoRoutes from './routes/produto.routes.js';
import consumoRoutes from './routes/consumo.routes.js';
import clienteRoutes from './routes/client.routes.js';
const app = express();
app.use(express.json());

/**
 * 🏗️ Cria um novo tenant (empresa)
 * Exemplo:
 * POST /tenants
 * { "name": "Choperia X" }
 */
app.post('/tenants', TenantController.create);

/**
 * 🔐 Login (usuário existente faz autenticação)
 */
app.post('/login', AuthController.login);

/**
 * 👥 CRUD de Clientes (multi-tenant, requer autenticação)
 */
app.use('/clientes', authenticate, clienteRoutes);
app.use('/produtos', authenticate, produtoRoutes);
app.use('/consumos', authenticate, consumoRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

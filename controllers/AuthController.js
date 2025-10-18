import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getMainSequelize } from '../config/database.js';
import { UsuarioModel } from '../models/usuario.js';

export const AuthController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const mainDB = getMainSequelize();
      const Usuario = UsuarioModel(mainDB);

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      // Gera token com schema do tenant embutido
      const token = jwt.sign(
        { id: usuario.id, schema: usuario.tenant_schema },
        process.env.JWT_SECRET || 'segredo',
        { expiresIn: '8h' }
      );

      res.json({
        accessToken: token,
        schema: usuario.tenant_schema,
        name: usuario.nome,
        email: usuario.email,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

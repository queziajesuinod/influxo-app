import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token ausente' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo');
    req.userId = decoded.id;
    req.schema = decoded.schema;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

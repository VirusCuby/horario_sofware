const jwt = require('jsonwebtoken');

const authorize = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado: no se proporcionó un token' });
    }

    try {
      const decoded = jwt.verify(token, 'clave_secreta');
      req.user = decoded;

      if (!roles.includes(decoded.rol)) {
        return res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};

module.exports = authorize;

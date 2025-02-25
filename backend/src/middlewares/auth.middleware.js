const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || "secretauth123";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Usuário não autenticado' });
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      
        if (err) return res.status(403).json({ message: 'Acesso não autorizado' });

        req.user = decoded; 
        next();
    });
};

module.exports = { verifyToken };

// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    // console.log('Headers recebidos:', req.headers); // Log para depurar todos os headers
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    // console.log('Auth Header recebido:', authHeader); // Log para depuração
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // console.log('Token não fornecido'); // Log para depuração
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // console.log('Erro na verificação do token:', err.message); // Log para depuração
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }

        req.user = decoded;
        // console.log('Usuário decodificado:', decoded); // Log para depuração
        next();
    });
};

export default authenticateToken;
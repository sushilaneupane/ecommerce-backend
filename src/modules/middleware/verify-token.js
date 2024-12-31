import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWTSECRETKEY;

  try {
    const decoded = verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};

export default verifyToken;

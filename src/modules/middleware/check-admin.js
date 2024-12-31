import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const checkAdminRole = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWTSECRETKEY;

  try {
    const decoded = jwt.verify(token, secretKey);

    if (decoded.role === 'ADMIN') {
      req.user = decoded;
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied. Admins only access this route.' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};

export default checkAdminRole;

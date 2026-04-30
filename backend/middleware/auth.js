

const jwt = require('jsonwebtoken');

// ✅ Require JWT secret (no fallback)
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    // ✅ Check header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // ✅ Check Bearer format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = parts[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Attach user to request
    req.user = decoded.user;

    next();

  } catch (err) {
    console.error(err.message);

    // ✅ Better error messages
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
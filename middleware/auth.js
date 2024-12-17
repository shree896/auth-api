const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user payload to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

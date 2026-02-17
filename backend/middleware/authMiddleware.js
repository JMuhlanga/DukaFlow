// middleware/authMiddleware.js
export const isAdmin = (req, res, next) => {
  // This assumes you have already verified the JWT in a previous middleware
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only!" });
  }
};
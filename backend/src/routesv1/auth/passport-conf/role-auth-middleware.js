/**
 * This middleware is used for provide role base access to a route.
 */
const authorizeRole = (user_type) => (req, res, next) => {
    if (!user_type.includes(req.user.user_type)) {
      return res.status(403).json({ message: "Forbidden: insufficient rights" });
    }
    next();
  };
  
  export default authorizeRole;
  
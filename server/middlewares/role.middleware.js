const role = (...roles) => {
  return (req, res, next) => {
    try {
      const checkRole = req.user.role;
      if (roles.includes(checkRole)) return next();
      else return res.status(403).json({ message: "Access forbidden" });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  };
};

export default role;

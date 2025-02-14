const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
  
    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }
  
    const tokenWithoutBearer = token.split(" ")[1];  // Extraer el token (sin 'Bearer')
    
    jwt.verify(tokenWithoutBearer, process.env.JWT, (err, user) => {
      if (err) return res.status(403).json({ message: "Token is not valid." });
      req.user = user;
      next();
    });
  };
  
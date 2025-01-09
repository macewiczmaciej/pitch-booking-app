import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized!" });
      }
    });
  };

  export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "You are not authenticated!" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Token verification error:", err.message);
        return res.status(403).json({ message: "Token is not valid!" });
      }
      console.log("Verified user:", user);
      req.user = user;
      next();
    });
  };

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized!" });
    }
  });
};
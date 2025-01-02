const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  console.log("Authorization Header:", token);

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    return res.status(500).json({ message: 'Server configuration error' });
  }

  if (token && token.startsWith('Bearer ')) {
    try {
      token = token.split(' ')[1]; // Extract the token after "Bearer"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (process.env.NODE_ENV !== 'production') {
        console.log("Decoded Token:", decoded);
      }

      req.admin = decoded; // Attach the decoded token to the request object
      next(); // Allow the request to proceed
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired, please login again' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
  } else {
    console.error("Authorization Header Missing or Malformed");
    return res.status(401).json({ message: 'Not authorized, token missing or malformed' });
  }
};

module.exports = protect;

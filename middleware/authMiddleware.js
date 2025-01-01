const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  console.log("Authorization Header:", token);

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]; // Extract the token after "Bearer"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      req.admin = decoded; // Attach the decoded token to the request object
      next(); // Allow the request to proceed
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  } else {
    console.error("Authorization Header Missing or Malformed");
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }
};

module.exports = protect;

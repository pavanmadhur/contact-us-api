const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]; // Extract the token after "Bearer"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded; // Attach the decoded token to the request object
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }
};


module.exports = protect;

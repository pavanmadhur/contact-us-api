const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simulated admin credentials (In a real app, this should be stored securely in a database)
const adminCredentials = {
    username: 'admin',
    password: 'admin123', // In a real app, store the password securely, e.g., using bcrypt
};

// Admin login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Generate a JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token validity
        });

        return res.status(200).json({ message: 'Login successful', 
            token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;

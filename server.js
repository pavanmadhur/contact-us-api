const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contactRouter');
const adminRouter = require('./routes/adminRouter');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: '*', // Adjust for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  });

// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// Routes
console.log("Routes loaded successfully");
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/admin', adminRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

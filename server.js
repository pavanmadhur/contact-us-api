const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose =require('mongoose');
const contactRouter = require('./routes/contactRouter');
const adminRouter = require('./routes/adminRouter');
const app = express();



require("dotenv").config(); 

// Middleware
app.use(express.json());
app.use(cors());

const mongoURI =process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/admin', adminRouter);


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



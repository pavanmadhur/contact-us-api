const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors =require('cors');
const contactRouter = require('./routes/contactRouter');
const adminRouter = require('./routes/adminRouter');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/contactUsDB"; // Update this to match your Compass database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


// Routes
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/admin', adminRouter); // Added admin login route

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  next();
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



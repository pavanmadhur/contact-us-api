const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose =require('mongoose');
const contactRouter = require('./routes/contactRouter');
const adminRouter = require('./routes/adminRouter');
const app = express();



dotenv.config(); 

// Middleware
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb://localhost:27017/contactUsDB"; // Update this to match your Compass database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  }
  )
// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/admin', adminRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



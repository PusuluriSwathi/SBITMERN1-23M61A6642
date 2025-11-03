const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/dbConnect');

const app = express();

// ✅ Configure CORS so your deployed frontend can call this backend
app.use(
  cors({
    origin: [
      'https://sbitmern1-23m61a6642-client.onrender.com', // your frontend URL
      'http://localhost:3000' // optional, allows local testing
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(bodyParser.json());

// ✅ Connect to MongoDB
connectDB().catch((err) => console.error('Initial DB connection failed', err));

// ✅ Define routes
app.use('/api', studentRoutes);
app.use('/api/auth', authRoutes);

// ✅ Health check route (optional but useful)
app.get('/', (req, res) => {
  res.send('✅ Server is running successfully!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/dbConnect');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB().catch(err => console.error('Initial DB connection failed', err));

app.use('/api', studentRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

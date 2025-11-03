/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

// require routes (ensure filename/casing matches)
const studentRoutes = require('./routes/studentRoutes');
app.use('/api', studentRoutes);

// Validate Mongo URI before attempting connection
const mongoUri = process.env.MONGODB_URI;
const isValidMongoUri = typeof mongoUri === 'string' && /^mongodb(\+srv)?:\/\//i.test(mongoUri);

if (isValidMongoUri) {
  mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.warn(
    'MONGODB_URI is missing or invalid. Skipping DB connection. ' +
      'Provide a connection string starting with "mongodb://" or "mongodb+srv://".'
  );
}

// health route
app.get('/', (req, res) => res.send('Server running'));

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
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
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

require('dotenv').config();

const JWT_SECRET = process.env.SECRET_KEY;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

if (!JWT_SECRET) {
  // eslint-disable-next-line no-console
  console.warn('WARNING: SECRET_KEY is not set in environment. Auth will fail without a secret.');
}

exports.register = async (req, res) => {
  try {
    const { uname, password, role = 'user' } = req.body;
    if (!uname || !password) return res.status(400).json({ message: 'Username and password are required' });

    const existingUser = await User.findOne({ uname });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({ uname, password: hashedPassword, role });

    await newUser.save();
    // do not return password
    res.status(201).json({ message: 'User registered successfully', user: { id: newUser._id, uname: newUser.uname, role: newUser.role } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { uname, password } = req.body;
    if (!uname || !password) return res.status(400).json({ message: 'Username and password are required' });

    const user = await User.findOne({ uname });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    if (!JWT_SECRET) return res.status(500).json({ message: 'Server configuration error: missing SECRET_KEY' });

    const token = jwt.sign({ id: user._id, uname: user.uname, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // return token and safe user info
    res.json({ message: 'Login successful', token, user: { id: user._id, uname: user.uname, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.testToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json({ message: 'Token is valid!', user: decoded });
  });
};

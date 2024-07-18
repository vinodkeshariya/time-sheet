const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Library for hashing passwords
require('dotenv').config();

const User = require('./models/User'); // Import the User model

const app = express();
const PORT = process.env.PORT || 5001;

const uri = 'mongodb://localhost:27017/timesheetdb'; // Corrected URI with quotes

mongoose
  .connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors());

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const newUser = new User({ name, username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // Return success message or user data if needed
    res.json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Corrected console.log statement

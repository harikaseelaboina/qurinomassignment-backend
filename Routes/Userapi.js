const express = require('express');
const mongoose = require('mongoose');
const User = require('../Schemas/Userschema'); 

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://harika:harika123@cluster0.n2lfsjh.mongodb.net/?retryWrites=true&w=majority');

app.post('/api/register', async (req, res) => {
    try {
        
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email is already in use' });
        }
    
       
        const newUser = new User({
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
          email: req.body.email,
          password: req.body.password
        });
    
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      }
catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//user login
// Route to handle user login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/getAll', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete all 
app.delete('/api/deleteAll', async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} Users deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
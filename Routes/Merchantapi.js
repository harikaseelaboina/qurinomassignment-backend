const express = require('express');
const mongoose = require('mongoose');
const Merchant = require('../Schemas/Merchantschema'); 
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://harika:harika123@cluster0.g4ujzs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/api/register', async (req, res) => {
  try {
   
    const existingMerchant = await Merchant.findOne({ email: req.body.email });
    if (existingMerchant) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

  
    const newMerchant = new Merchant({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      city: req.body.city,
      businessName: req.body.businessName,
      email: req.body.email,
      password: req.body.password
    });

   
    const savedMerchant = await newMerchant.save();
    res.status(201).json(savedMerchant);
  }
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//  merchant login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const merchant = await Merchant.findOne({ email });

    
    if (!merchant || merchant.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all registered merchants
app.get('/api/getAll', async (req, res) => {
  try {
    const merchants = await Merchant.find();
    res.status(200).json(merchants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete all registered merchants
app.delete('/api/deleteAll', async (req, res) => {
  try {
    const result = await Merchant.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} merchants deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const Product = require('../Schemas/Productschema'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://harika:harika123@cluster0.n2lfsjh.mongodb.net/?retryWrites=true&w=majority');

app.post('/create', async (req, res) => {
    try {
      const newProduct = new Product({
        productName: req.body.productName,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        businessName: req.body.businessName,
        postedBy: req.body.postedBy
      });
  
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
 // Route to get all products
app.get('/getAll', async (req, res) => {
    try {
      const allProducts = await Product.find();
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }); 


  // Route to get all products by postedBy field
app.get('/getbypost/:postedBy', async (req, res) => {
    try {
      const productsByPostedBy = await Product.find({ postedBy: req.params.postedBy });
      res.status(200).json(productsByPostedBy);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Route to get all products by businessName
app.get('/getbybusiness/:businessName', async (req, res) => {
    try {
      const productsByBusinessName = await Product.find({ businessName: req.params.businessName });
      res.status(200).json(productsByBusinessName);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to get a product by ID
app.get('/getbyid/:productId', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  // Route to delete all products by postedBy field
app.delete('/delete/:postedBy', async (req, res) => {
    try {
      const result = await Product.deleteMany({ postedBy: req.params.postedBy });
      res.status(200).json({ message: `${result.deletedCount} products deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  // Route to delete all products
app.delete('/deleteall', async (req, res) => {
    try {
      const result = await Product.deleteMany();
      res.status(200).json({ message: `${result.deletedCount} products deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  //  to edit a product by ID
app.put('/update/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
      // Check if the product with the given ID exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Update specific fields or all fields based on the request body
      existingProduct.productName = req.body.productName || existingProduct.productName;
      existingProduct.category = req.body.category || existingProduct.category;
      existingProduct.price = req.body.price || existingProduct.price;
      existingProduct.description = req.body.description || existingProduct.description;
      existingProduct.businessName = req.body.businessName || existingProduct.businessName;
      existingProduct.postedBy = req.body.postedBy || existingProduct.postedBy;
  
      // Save the updated product
      const updatedProduct = await existingProduct.save();
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  


module.exports = app;

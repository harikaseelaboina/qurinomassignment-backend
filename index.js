const express = require('express');
const merchantRoutes = require('./Routes/Merchantapi.js');
const userRoutes = require('./Routes/Userapi.js'); 
const productRoutes=require('./Routes/Productapi.js'); 
const audioRoutes=require('./Routes/Audio.js'); 
const mongoose = require('mongoose');   
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://harika:harika123@cluster0.g4ujzs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
      });



// Use the merchant,user, productapis
app.use('/merchants', merchantRoutes);
app.use('/user', userRoutes); 
app.use('/product',productRoutes);
app.use('/audioapi',audioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

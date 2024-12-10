const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const homeRoute = require('./routes/home');
const authRoute = require('./routes/authen');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
      console.log('Incoming Request:', req.method, req.url);
      console.log('Request Headers:', req.headers);
      console.log('Request Body:', req.body);
      next();
});
app.use('/', homeRoute);
app.use('/authen', authRoute);


mongoose.connect('mongodb://localhost:27017/e-voting')
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Visit the app at: http://localhost:${PORT}`);
});

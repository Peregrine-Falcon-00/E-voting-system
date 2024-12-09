const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const homeRoute = require('./routes/home');
const authRoute = require('./routes/authen');

app.use(express.json());

app.use('/', homeRoute);  // Home route (e.g., /)
// Mounting auth routes under /authen
app.use('/authen', authRoute);  // Correct route to handle both login and signup


mongoose.connect('mongodb://localhost:27017/e-voting')
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Visit the app at: http://localhost:${PORT}`);
});

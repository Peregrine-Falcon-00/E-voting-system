const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});
router.get('/signup', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
});
router.post('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;

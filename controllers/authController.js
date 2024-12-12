const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    router.get('/login', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }


    res.status(200).json({ message: 'Login successful', user: { id: user._id, fullName: user.fullName } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

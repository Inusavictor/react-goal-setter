const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//@desc register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //fields validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  //check if user email exists
  const userExist = await User.findOne({ email });

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //response after email validation
  if (userExist) {
    res.status(400);
    throw new Error('User exists, Please use a different email');
  } else {
    const addUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      id: addUser._id,
      name: addUser.name,
      email: addUser.email,
      token: generateToken(addUser._id),
    });
  }
});

//@desc Login/Authenticate user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //input validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  //check if user exist
  const user = await User.findOne({ email });

  //validate user password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('email or password is wrong');
  }
});

//@desc Get user profile
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({ id: _id, name, email });
});

//Generate a JWT secret token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { registerUser, loginUser, getMe };

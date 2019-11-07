const user = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const users = await user.find();
  //SEND QUERY
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented'
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented'
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented'
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented'
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
};

const User = require('../models/index.js'); // Correctly import the User model

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.render('admin/users', { title: ' Users', users }); // Pass the data to the view
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsers
};

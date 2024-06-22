const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedNewPassword });

    return res.redirect('/login');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

  module.exports = {
    changePassword
  };
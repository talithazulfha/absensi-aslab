const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const form = (req, res) => {
  const token = req.cookies.token;
  res.render("login", { title: "Login" });
};

const checklogin = async (req, res) => {
  const { id, password } = req.body;
  
  console.log('Request body:', req.body);
  
  if (!id || !password) {
    return res.status(400).json({ message: "ID and password are required" });
  }
  
  try {
    const foundUser = await User.findOne({ where: { id } });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: foundUser.id, role: foundUser.role, email: foundUser.email, namaAnggota: foundUser.namaAnggota },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: '1d' }
    );

    res.cookie("token", token, { httpOnly: true });

    if (foundUser.role === "aslab") {
      return res.redirect("/aslab/home");
    } else if (foundUser.role === "admin") {
      return res.redirect("/admin/dashboard");
    }
    console.log('User role:', foundUser.role); 
    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout  (req, res) {
  res.clearCookie("token");
  res.redirect("/login");
}

module.exports = {
  form,
  checklogin,
  logout
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const form = (req, res) => {
  const token = req.cookies.token;

  res.render("login", { title: "Login" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // verifikasi password
    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // buat token JWT
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: 86400 }
    );

    // set cookie dengan token
    res.cookie("token", token, { httpOnly: true });

    // redirect ke halaman sesuai dengan role
    if (foundUser.role === "aslab") {
      return res.redirect("/aslab/home");
    } else if (foundUser.role === "admin") {
      return res.redirect("/admin/dashboard");
    }
    console.log(foundUser.role)
    // respon, jika role tidak cocok
    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
 
}

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // cari user berdasarkan userId
    const user = await User.findByPk(req.userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // periksa kecocokan pass saat ini
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      // respon pass saat ini salah
      return res.status(401).json({ message: "Password saat ini salah" });
    }

    // enkripsi new pass
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // update pass di database
    await user.update({ password: hashedNewPassword });
    return res.redirect('/login');
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server pada database" });
  }
};

module.exports = {
  form,
  checklogin,
  logout,
  changePassword
};

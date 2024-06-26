const {User, Pertemuan} = require('../models'); 
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const { userNama } = req; 

    res.render('admin/anggota', {
      title: 'Anggota',
      users,
      userNama
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getIddanAnggota = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'namaAnggota'] });
    console.log(users) 
    res.json(users);  
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getData = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render('admin/akun', {
      title: 'User Account',
      userId: user.id,
      userRole: user.role,
      userEmail: user.email,
      userNama: user.namaAnggota,
      userJabatan: user.jabatan,
      userNoHp: user.noHp,
      userProfilePhoto: user.profilePhoto
    });
  } catch (error) {
    console.error("Error fetching user data: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getDashboardData = async (req, res) => {
  try {

      const { count: aslabCount } = await User.findAndCountAll({ where: { role: 'ASLAB' } });

      const pertemuanCount = await Pertemuan.count();

      res.render('admin/dashboard', {
          title: 'Admin Dashboard',
          aslabCount,
          pertemuanCount
      });
  } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);


    await user.update({ password: hashedNewPassword });

    
    return res.redirect('/login'); 
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  getDashboardData,
  changePassword,
  getData,
  getIddanAnggota
};

const {User, Pertemuan} = require('../models'); 

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

module.exports = {
  getUsers,
  getDashboardData
};

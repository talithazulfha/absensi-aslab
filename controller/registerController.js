const bcrypt = require('bcrypt');
const { User } = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const register = async (req,res) => {
    const { noAnggota, namaAnggota, jabatan, noHp } = req.body;
    const email = 'email@gmail.com';
    const password = '12345678';

    try {
        console.log('Request Body:', req.body);
        console.log('Upload File:', req.file);

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const newUser = await User.create({
            id: noAnggota,
            namaAnggota,
            password: hashedPassword,
            email,
            role: 'aslab',
            jabatan,
            noHp,
            profilePhoto: req.file ? req.file.filename : null
        });
        console.log('New User Created:', newUser);

          res.redirect('/admin/anggota');
    } catch (error) {
        console.error('Error registering new user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register, upload };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req,res) => {
    const { noAnggota, namaAnggota, jabatan, noHp } = req.body;
    const email = 'email@gmail.com';
    const password = '12345678';

    try {
        console.log('Request Body:', req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const newUser = await User.create({
            id: noAnggota,
            namaAnggota,
            password: hashedPassword,
            email,
            role: 'aslab',
            jabatan,
            noHp
        });
        console.log('New User Created:', newUser);

        // const token = jwt.sign(
        //     { id: newUser.id, role: newUser.role },
        //     process.env.JWT_SECRET_TOKEN,
        //     { expiresIn: '1d' }
        //   );
        //   console.log('JWT Token:', token);

        //   res.cookie('token', token, { httpOnly: true });

          res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error registering new user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register };
const { Guest } = require('../models');

const addGuest = async (req, res) => {
  const { name, email } = req.body;

  console.log('Received data:', req.body); 

  try {
    const newGuest = await Guest.create({ name, email });
    res.status(201).json(newGuest);
  } catch (error) {
    console.error('Error adding guest:', error.message); 
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addGuest
};

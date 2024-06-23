const { Guest, Feedback } = require('../models');

exports.addFeedback = async (req, res) => {
  const { name, email, feedback } = req.body;

  try {

    let guest = await Guest.findOne({ where: { email: email } });
    if (!guest) {
      guest = await Guest.create({ name: name, email: email });
    }

    await Feedback.create({
      id_tamu: guest.id,
      feedback: feedback,
      tanggal_waktu: new Date()
    });

    res.status(200).redirect('/feedback'); 
  } catch (error) {
    res.status(500).send('Error occurred: ' + error.message);
  }
};

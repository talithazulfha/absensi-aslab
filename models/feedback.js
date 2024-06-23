module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    id_feedback: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_tamu: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Guests',
        key: 'id'
      }
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tanggal_waktu: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'feedback',
    timestamps: false,
});


  return Feedback;
};

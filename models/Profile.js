const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  county: {
    type: String,
    required: true,
  },
  subCounty: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  vaccine: [
    {
      doses: {
        type: Number,
        required: true,
      },
      vaccineName: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      manufacturer: {
        type: String,
        required: true,
      },
    },
  ],
})
module.exports = Profile = mongoose.model('profile', ProfileSchema)

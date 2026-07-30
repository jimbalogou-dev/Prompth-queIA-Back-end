const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  // Define your tag schema fields here
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    maxlength: 200
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Tag', TagSchema);
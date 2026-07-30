const mongoose = require("mongoose");

const FavorisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  promptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  
});

module.exports = mongoose.model('Favoris', FavorisSchema);

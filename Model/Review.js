const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  // Define your review schema fields here
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  targetType: {
    type: String,
    enum: ['user', 'post', 'comment'],
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    maxlength: 200
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  promptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  }
});

module.exports= mongoose.model('Review', ReviewSchema);
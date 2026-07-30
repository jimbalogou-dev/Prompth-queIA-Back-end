const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  relatedPromptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    default: null
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'error', 'success'],
    default: 'info'
  },
  relatedentityId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
});

module.exports = mongoose.model('Notification', NotificationSchema);

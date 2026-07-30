const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  // Define your report schema fields here
  reporterId: {
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
    reason: {
      type: String,
      required: true
    },
    reportedDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'resolved', 'rejected'],
      default: 'pending'
    },
    createDate: {
      type: Date,
      default: Date.now
    }
  });

module.exports = mongoose.model('Report', ReportSchema);
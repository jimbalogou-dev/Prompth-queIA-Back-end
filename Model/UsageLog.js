const mongoose = require("mongoose");

const UsageLogSchema = new mongoose.Schema({
  // Define your usage log schema fields here
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actionType: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  promptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt'
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UsageLog', UsageLogSchema);
const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  // Define your subscription schema fields here
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'canceled'],
    default: 'active'
  }
});

module.exports= mongoose.model('Subscription', SubscriptionSchema);
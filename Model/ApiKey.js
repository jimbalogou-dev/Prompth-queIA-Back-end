const mongoose = require("mongoose");

const ApiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  keyname: {
    type: String,
    required: true
  },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scope: {
        type: [String],
        default: ['read', 'write']
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'revoked'],
        default: 'active'
    },
    lastUsed: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);
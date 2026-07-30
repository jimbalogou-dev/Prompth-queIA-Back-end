const mongoose = require("mongoose");

const PromptVersionSchema = new mongoose.Schema({
  promptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  changelog: {
    type: String,
    default: ''
  }
});

module.exports= mongoose.model('PromptVersion', PromptVersionSchema);
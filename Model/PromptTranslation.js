const mongoose = require("mongoose");

const PromptTranslationSchema = new mongoose.Schema({
  promptid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  },
  language: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  ismachinetranslation: {
    type: Boolean,
    default: false
  },
  translationdate: {
    type: Date,
    default: Date.now
  },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active'
    },
    updatedate: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('PromptTranslation', PromptTranslationSchema);
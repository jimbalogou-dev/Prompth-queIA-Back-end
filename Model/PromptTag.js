const mongoose = require("mongoose");

const PromptTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  promptid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  },
    createDate: {
      type: Date,
      default: Date.now
    },
    tagid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: true
    }
});

module.exports= mongoose.model('PromptTag', PromptTagSchema);
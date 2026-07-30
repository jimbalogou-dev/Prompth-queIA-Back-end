const mongoose = require("mongoose");

const AIModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
    provider: {
        type: String,
        required: true
    },
    iconUrl: {
        type: String,
        default: ''
      }

});

 module.exports = ('AIModel', AIModelSchema);
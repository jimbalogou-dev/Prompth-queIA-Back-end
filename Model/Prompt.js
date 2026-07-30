const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  authorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    category: {
      type: String,
      default: ''
   },
   iamodel: {
      type: String,
      default: ''
   },
   language: {
      type: String,
      default: ''
   },
   visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'private'
   },
   tags: {
      type: [String],
      default: []
   },
status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active'
   },
   licencetype: {
      type: String,
      enum: ['free', 'premium'],
        default: 'free'
   },
   viewCount: {
      type: Number,
      default: 0
   },
   usageCount: {
      type: Number,
      default: 0
   },
   likeCount: {
      type: Number,
      default: 0
   },
   averageRating: {
      type: Number,
      default: 0
   },

 icon: {
  type: String,
  default: '🤖'
},
color: {
  type: String,
  default: '#7c3aed'
},



});

module.exports = mongoose.model('Prompt', PromptSchema);

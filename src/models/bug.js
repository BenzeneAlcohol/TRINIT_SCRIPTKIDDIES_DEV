const mongoose = require('mongoose');
const User = require('./user');
const Team = require('./team');
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const BugSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [ImageSchema],
  priority: { type: String, enum: ['Critical', 'Important', 'Nominal'] },
  status: { type: String, enum: ['open', 'assigned', 'closed'] },
  //Bug Finder
  finder: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  assigne: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
});

module.exports = mongoose.model('Bug', BugSchema);

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
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },
  status: { type: String, enum: ['open', 'assigned', 'closed'] },
  //Bug Finder
  finder: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  assigned: [
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

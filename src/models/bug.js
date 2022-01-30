const mongoose = require('mongoose');
const User = require('./user');
const Team = require('./team');
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const BugSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    images: [ImageSchema],
    priority: {
      type: String,
      enum: ['Critical', 'Important', 'Nominal'],
      default: 'Nominal',
    },
    status: {
      type: String,
      enum: ['open', 'assigned', 'closed'],
      default: 'open',
    },
    //Bug Finder
    finder: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    assignee: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    deadline: {
      type: Date,
      default: Date.now(),
    },
    discussions: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        TimePosted: {
          type: Date,
          default: Date.now(),
        },
        text: String,
      },
    ],
    requests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Bug', BugSchema);

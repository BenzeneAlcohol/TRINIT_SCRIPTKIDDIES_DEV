const mongoose = require('mongoose');
const User = require('./user');
const Bug = require('./bug');
const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: {
    type: String,
  },
  bugs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bug',
    },
  ],
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: ['Beginner', 'Intermediate', 'Expert'],
    },
  ],
});

module.exports = mongoose.model('Team', TeamSchema);

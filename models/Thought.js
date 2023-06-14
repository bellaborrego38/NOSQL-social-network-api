const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');


// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtDate => moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a')
    
    },

    username: {
        type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/,"invalid email format"]
    },
      
    reactions: [Reaction]

}, {
  toJSON: {
      virtuals: true
  },
  id: false
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

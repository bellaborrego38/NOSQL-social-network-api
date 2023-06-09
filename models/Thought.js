const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


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
      // get: timestamp => dateFormat(timestamp)
    
    },

    username: {
        type: String,
      required: true
    },
      
    reactions: [reactionSchema]

},
{
  toJSON: {
      getters: true
  },
  id: false
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

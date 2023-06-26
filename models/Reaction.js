const { Schema, model } = require('mongoose');


// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

      
    createdAt : {
      type: Date,
      default: Date.now,
      get: createdAtDate => moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a')
  }
}, {
  toJSON: {
      virtuals: true,
  },
  id: false

});


module.exports = reactionSchema;

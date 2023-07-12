const { User, Thought } = require('../models');

const thoughtController = {
  async getThoughts (req, res) {
    const result = await Thought.find ({})
  // .then((thoughts) => {
  //   console.log(thoughts)
    res.json(result)
  // .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate({
        path: 'reactions',
        select: '-__v'
      }).then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought matches that ID' });
        } else {
          res.json(thought);
        }
      }).catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body).then((thought) => {
      return User.findOneAndUpdate(
        req.body.username, {
        $addToSet: { thoughts: thought._id }
      },
        { new: true }
      );
    }).then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User was not found, thought was deleted!' });
      } else {
        res.json(userData);
      }
    }).catch((err) => res.json(err));
  },

  updateThought(req, res) {
    console.log(req.body);
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId
      },
      {
        $set: req.body
      },
      {
        runValidators: true,
        new: true
      }
    ).then((thought) => {
      if (!thought) {
        res.status(404).json({ message: 'Thought was not found' });
      }
      res.json(thought)
    }).catch((err) => res.json(err));
  },

  deleteThought(req, res) {
    console.log(req.body);
    Thought.findOneAndRemove( {
      _id: req.params.thoughtId
    }).then((thought) => {
      return User.findOneAndUpdate(
        {thoughts: req.params.thoughtId}, {
        $pull: { thoughts: req.params.thoughtId}
      },
        { new: true }
      );
    }).then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Thought was deleted!' });
      } else {
        res.json(userData);
      }
    }).catch((err) => res.json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought was not found with that ID!' });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: '!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  }
};



module.exports = thoughtController;





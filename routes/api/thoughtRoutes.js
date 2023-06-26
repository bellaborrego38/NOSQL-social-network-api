const express = require('express');
const thoughtController = require('../../controllers/thoughtController');

const router = express.Router();

router.get('/', thoughtController.getThoughts);
router.post('/', thoughtController.createThought);

router.get('/:thoughtId', thoughtController.getSingleThought);
// router.put('/api/thoughts/:thoughtId', thoughtController.updateThought);
// router.delete('/api/thoughts/:thoughtId', thoughtController.deleteThought);

router.post('/:thoughtId/reactions/:reactionId', thoughtController.addReaction);

router.delete('/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;

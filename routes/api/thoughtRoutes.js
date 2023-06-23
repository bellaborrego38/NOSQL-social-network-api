const express = require('express');
const thoughtController = require('../../controllers/thoughtController');

const router = express.Router();

router.get('/api/Thoughts', thoughtController.getThoughts);
router.post('/api/Thoughts', thoughtController.createThought);

router.get('/api/thoughts/:thoughtId', thoughtController.getSingleThought);
router.put('/api/thoughts/:thoughtId', thoughtController.updateThought);
router.delete('/api/thoughts/:thoughtId', thoughtController.deleteThought);

router.post('/api/thoughts/:thoughtId/reactions', thoughtController.addReaction);

router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;

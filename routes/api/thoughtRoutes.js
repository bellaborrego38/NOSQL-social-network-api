const express = require('express');
const thoughtController = require('../../controllers/thoughtController');

const router = express.Router();

router.route('/').get(thoughtController.getThoughts).post(thoughtController.createThought);
// router.post('/', thoughtController.createThought);
// router.get('/:thoughtId', thoughtController.getThoughts);
router.get('/:thoughtId', thoughtController.getSingleThought);
router.put('/:thoughtId', thoughtController.updateThought);
router.delete('/:thoughtId', thoughtController.deleteThought);

router.post('/:thoughtId/reactions/:reactionId', thoughtController.addReaction);

router.delete('/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;

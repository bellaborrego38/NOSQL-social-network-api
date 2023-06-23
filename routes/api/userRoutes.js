const express = require('express');
const userController = require('../../controllers/userController');

const router = express.Router();

router.get('/api/users', userControllers.getUsers);
router.post('/api/users', userControllers.createUser);

router.get('/api/users/:userId', userController.getSingleUser);
router.put('/api/users/:userId', userController.updateUser);
router.delete('/api/users/:userId', userController.deleteUser);

router.post('/api/users/:userId/friends/:friendId', userController.addFriend);
router.delete('/api/users/:userId/friends/:friendId', userController.deleteFriend);

module.exports = router;
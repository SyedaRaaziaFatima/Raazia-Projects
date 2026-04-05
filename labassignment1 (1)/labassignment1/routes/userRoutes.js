const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/link-student', userController.linkStudent);
router.get('/my-books/:studentId', userController.getMyBooks);
router.get('/session', userController.getSession);
router.post('/logout', userController.logoutUser);

module.exports = router;
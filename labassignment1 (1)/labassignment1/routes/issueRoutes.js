const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
router.post('/issue', issueController.issueBook);
router.get('/all', issueController.getIssuedBooks);
module.exports = router;
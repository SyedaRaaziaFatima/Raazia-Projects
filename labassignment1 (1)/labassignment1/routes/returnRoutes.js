const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');
router.put('/return/:id', returnController.returnBook);
router.get('/history', returnController.getReturnHistory);

module.exports = router;
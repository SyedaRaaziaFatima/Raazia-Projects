const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
router.post('/add', bookController.addBook);
router.get('/all', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.put('/update/:id', bookController.updateBook);
router.delete('/delete/:id', bookController.deleteBook);

module.exports = router;
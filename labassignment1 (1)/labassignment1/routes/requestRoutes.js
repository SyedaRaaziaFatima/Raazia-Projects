const express = require('express');
const router  = express.Router();
const rc      = require('../controllers/requestController');

router.post('/create',          rc.createRequest);
router.get('/all',              rc.getAllRequests);
router.put('/accept/:id',       rc.acceptRequest);
router.put('/reject/:id',       rc.rejectRequest);

module.exports = router;

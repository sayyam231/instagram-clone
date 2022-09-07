const express = require('express');
const router = express.Router();
const postConstroller = require('../controllers/post');
router.post('/create', postConstroller.create);
router.get('/comments/:id', postConstroller.showComment);
module.exports = router;
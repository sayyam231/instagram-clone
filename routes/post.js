const express = require('express');
const router = express.Router();
const postConstroller = require('../controllers/post');
router.post('/create', postConstroller.create);
module.exports = router;
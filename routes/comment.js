const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentController = require('../controllers/comment');
router.post('/create', commentController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentController.destroy);
module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const postConstroller = require('../controllers/post');
router.post('/create',passport.checkAuthentication, postConstroller.create);
router.get('/comments/:id',postConstroller.showComment);
router.get('/destroy/:id', passport.checkAuthentication,postConstroller.destroy);
module.exports = router;
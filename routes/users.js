const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const passport = require('passport');
router.get('/profile', userController.profile);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate('local',{failureRedirect: '/'}), userController.createSession);
module.exports = router;
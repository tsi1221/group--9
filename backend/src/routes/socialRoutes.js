const express = require('express');
const passport = require('passport');
const { handleOAuthCallback } = require('../controllers/socialAuthController');

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/auth/failure`, session: false }),
  handleOAuthCallback
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${FRONTEND_URL}/auth/failure`, session: false }),
  handleOAuthCallback
);

module.exports = router;

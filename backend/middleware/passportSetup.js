const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { createUser } = require('../models/userModel');

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  const { email, given_name, family_name } = profile._json;

  const user = await createUser({
    firstname: given_name,
    middlename: '',
    lastname: family_name,
    email,
    password: '', // no password for social
    phone: '',
    provider: 'google',
    role: 'user'
  });

  return done(null, user);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.BASE_URL}/api/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  const { email, first_name, last_name } = profile._json;

  const user = await createUser({
    firstname: first_name,
    middlename: '',
    lastname: last_name,
    email,
    password: '',
    phone: '',
    provider: 'facebook',
    role: 'user'
  });

  return done(null, user);
}));

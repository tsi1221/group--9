const { findOrCreateUser } = require('../models/socialMediaModel');
const { generateToken } = require('../utils/tokenUtils');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const handleOAuthCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${FRONTEND_URL}/auth/failure`);
    }

    const { provider, id: provider_id, emails, displayName, photos } = req.user;

    const email = emails && emails[0] && emails[0].value;
    const name = displayName;
    const avatar = photos && photos[0] && photos[0].value;

    const user = await findOrCreateUser({ provider, provider_id, email, name, avatar });

    const token = generateToken({ id: user.id, email: user.email });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${FRONTEND_URL}/auth/success`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.redirect(`${FRONTEND_URL}/auth/failure`);
  }
};

module.exports = {
  handleOAuthCallback,
};

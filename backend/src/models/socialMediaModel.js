const pool = require('../config/db');
const { createUser } = require('./userModel'); // import your existing createUser

// Find user by OAuth provider and provider ID (e.g. google, facebook)
const findByProvider = async (provider, providerId) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE provider = $1 AND provider_id = $2`,
    [provider, providerId]
  );
  return result.rows[0];
};

// Find user by email
const findByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

// Update user's provider info (for linking accounts)
const updateProvider = async (userId, provider, providerId, avatar) => {
  const result = await pool.query(
    `UPDATE users SET provider = $1, provider_id = $2, avatar = $3, updated_at = NOW() WHERE id = $4 RETURNING *`,
    [provider, providerId, avatar, userId]
  );
  return result.rows[0];
};

// find or create user with social auth data
const findOrCreateUser = async ({ provider, provider_id, email, name, avatar }) => {
  let user = await findByProvider(provider, provider_id);
  if (user) return user;

  if (email) {
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return await updateProvider(existingUser.id, provider, provider_id, avatar);
    }
  }

  // Create user with social data, set firstname/lastname from name split
  let firstname = '', lastname = '';
  if (name) {
    const parts = name.split(' ');
    firstname = parts[0];
    lastname = parts.slice(1).join(' ') || '';
  }

  return await createUser({
    role: 'user',          // default role
    firstname,
    middlename: '',
    lastname,
    email,
    password: '',          // no password for social login
    phone: '',
    provider,
    provider_id,           // add provider_id in your users table!
    avatar                 // you may want to add avatar column too
  });
};

module.exports = {
  findByProvider,
  findByEmail,
  updateProvider,
  findOrCreateUser,
};

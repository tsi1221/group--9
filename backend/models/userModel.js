const pool = require('../config/db');

const createUser = async (userData) => {
  const {
    role, firstname, middlename, lastname,
    email, password, phone, provider
  } = userData;

  const result = await pool.query(
    `INSERT INTO users (role, firstname, middlename, lastname, email, password, phone, provider)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [role, firstname, middlename, lastname, email, password, phone, provider]
  );

  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};

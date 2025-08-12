const prisma = require('../../config/prisma');

// Create a new user
const createUser = async (userData) => {
  // Make sure userData contains all required fields: firstname, middlename, lastname,
  // email, phone, password, address, provider, roleId
  return prisma.user.create({ data: userData });
};

// Get a user by email or phone (identifier)
const getUserByEmailOrPhone = async (identifier) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { phone: identifier }]
    }
  });
};

// Get user by ID with related role and cases included
const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
      clientCases: true,
      lawyerCases: true
    }
  });
};

module.exports = {
  createUser,
  getUserByEmailOrPhone,
  getUserById
};

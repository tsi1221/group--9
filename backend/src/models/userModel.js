const prisma = require('../../config/prisma');

// Create a new user with role validation
const createUser = async (userData) => {
  // Set default role if not provided (assuming 2 is a regular user role)
  if (!userData.roleId) {
    userData.roleId = 2;
  }

  // Verify the role exists before creating the user
  const roleExists = await prisma.role.findUnique({
    where: { id: userData.roleId }
  });

  if (!roleExists) {
    throw new Error(`Role with ID ${userData.roleId} does not exist`);
  }

  // Ensure required fields are present
  const requiredFields = ['firstname', 'lastname', 'email', 'phone', 'password', 'address'];
  const missingFields = requiredFields.filter(field => !userData[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  return prisma.user.create({ 
    data: userData 
  });
};

// Get a user by email or phone (identifier)
const getUserByEmailOrPhone = async (identifier) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { phone: identifier }]
    },
    include: {
      role: true // Include role information
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
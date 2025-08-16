const prisma = require('../../config/prisma');
const bcrypt = require('bcryptjs');

// -------------------- ADMIN DASHBOARD -------------------- //

exports.adminDashboard = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count({ where: { role: { name: 'CLIENT' } } });
    const totalLawyers = await prisma.user.count({ where: { role: { name: 'LAWYER' } } });
    const totalOpenCases = await prisma.case.count({ where: { status: 'OPEN' } });

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const paymentsThisMonth = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { createdAt: { gte: startOfMonth, lte: endOfMonth } },
    });

    res.json({
      totalUsers,
      totalLawyers,
      totalOpenCases,
      paymentsThisMonth: paymentsThisMonth._sum.amount || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Update Admin's own profile
exports.updateSelf = async (req, res) => {
  try {
    const adminId = req.user.id; // from JWT middleware
    const { firstname, middlename, lastname, email, address, phone } = req.body;

    const updatedAdmin = await prisma.user.update({
      where: { id: adminId },
      data: {
        firstname,
        middlename,
        lastname,
        email,
        address,
        phone,
      },
    });

    res.json({ message: "Admin profile updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- USERS & LAWYERS CRUD -------------------- //

// List all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ where: { role: { name: 'CLIENT' } } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all lawyers
exports.getAllLawyers = async (req, res) => {
  try {
    const lawyers = await prisma.user.findMany({ where: { role: { name: 'LAWYER' } } });
    res.json(lawyers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user/lawyer by ID
exports.getUserOrLawyerById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new user/lawyer
exports.createUserOrLawyer = async (req, res) => {
  try {
    const { firstname, middlename, lastname, email, password, role, phone, address, roleId } = req.body;

    // Validate role
    if (!['CLIENT', 'LAWYER'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check required fields
    if (!firstname || !middlename || !lastname || !email || !password || !phone || !address || !roleId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstname,
        middlename,
        lastname,
        email,
        password: hashedPassword,
        role,    // must match enum values exactly: CLIENT / LAWYER / ADMIN
        phone,
        address,
        roleId,
      },
    });

    res.status(201).json({ message: `${role} created successfully`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update user/lawyer
exports.updateUserOrLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);
    if (role && ['CLIENT', 'LAWYER'].includes(role)) data.role = role;

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    res.json({ message: 'Updated successfully', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user/lawyer
exports.deleteUserOrLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------- SEARCH -------------------- //

// Search users/lawyers by name
exports.searchUsersByName = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { role: { name: 'CLIENT' } }, 
          { name: { contains: name, mode: 'insensitive' } }
        ],
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search cases by status and name
exports.searchCases = async (req, res) => {
  try {
    const { status, caseName } = req.query;
    const cases = await prisma.case.findMany({
      where: {
        AND: [
          status ? { status } : {},
          caseName ? { name: { contains: caseName, mode: 'insensitive' } } : {},
        ],
      },
    });
    res.json(cases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

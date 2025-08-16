const prisma = require('../../config/prisma');

// Admin dashboard metrics
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

// List all users
exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({ where: { role: { name: 'CLIENT' } } });
  res.json(users);
};

// List all lawyers
exports.getAllLawyers = async (req, res) => {
  const lawyers = await prisma.user.findMany({ where: { role: { name: 'LAWYER' } } });
  res.json(lawyers);
};

// CRUD: Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(user);
};

// CRUD: Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.json(updatedUser);
};

// CRUD: Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.json({ message: 'User deleted successfully' });
};

// Search users by name
exports.searchUsersByName = async (req, res) => {
  const { name } = req.query;
  const users = await prisma.user.findMany({
    where: {
      AND: [
        { role: { name: 'CLIENT' } }, 
        { firstname: { contains: name, mode: 'insensitive' } }
      ],
    },
  });
  res.json(users);
};

// Search cases by status and title
exports.searchCases = async (req, res) => {
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
};

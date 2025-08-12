const { PrismaClient } = require('../generated/prisma');  // <-- point to the generated client
const prisma = new PrismaClient();

module.exports = prisma;

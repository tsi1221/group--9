const prisma = require('../config/prisma'); // adjust path if needed

async function seedRoles() {
  await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'user' },
      { name: 'lawyer' }
    ],
    skipDuplicates: true,
  });
  console.log('Roles seeded');
}

seedRoles()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

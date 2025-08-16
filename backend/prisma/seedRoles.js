const prisma = require('../config/prisma'); // adjust path if needed

async function seedRoles() {
  await prisma.role.createMany({
    data: [
      { name: "ADMIN" },
      { name: "CLIENT" },
      { name: "LAWYER" }
    ],
    skipDuplicates: true,
  });
}

seedRoles()
  .then(() => {
    console.log("Roles seeded successfully 🚀");
    process.exit(0);
  })
  .catch((e) => {
    console.error("Error seeding roles:", e);
    process.exit(1);
  });

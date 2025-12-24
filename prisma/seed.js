const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const plain = "admin123";

  const password = await bcrypt.hash(plain, 10);

  await db.user.upsert({
    where: { email },
    update: {
      name: "Admin",
      password,
      emailVerified: new Date(),
    },
    create: {
      name: "Admin",
      email,
      password,
      emailVerified: new Date(),
    },
  });

  console.log("Admin user upserted:", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

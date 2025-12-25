const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();

async function main() {
  const userId = "moinulfaisal";
  const newPassword = "candidate123";

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { id: userId },
    data: {
      password: hashed,
    },
  });

  console.log("✅ Candidate password reset successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

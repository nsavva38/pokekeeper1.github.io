const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

const seed = async () => {
  const users = [
    { username: "user1", password: await bcrypt.hash("password1", 10) },
    { username: "user2", password: await bcrypt.hash("password2", 10) },
    { username: "user3", password: await bcrypt.hash("password3", 10) },
    { username: "user4", password: await bcrypt.hash("password4", 10) },
    { username: "user5", password: await bcrypt.hash("password5", 10) },
    { username: "user6", password: await bcrypt.hash("password6", 10) },
    { username: "user7", password: await bcrypt.hash("password7", 10) },
    { username: "user8", password: await bcrypt.hash("password8", 10) },
    { username: "user9", password: await bcrypt.hash("password9", 10) },
    { username: "user10", password: await bcrypt.hash("password10", 10) },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

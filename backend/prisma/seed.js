const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

const seed = async () => {
  const users = [];
  const numUsers = 10;
  for (let i = 1; i <= numUsers; i++) {
    users.push({
      username: `user${i}`,
      password: await bcrypt.hash(`password${i}`, 10),
    });
  }

  for (const user of users) {
     await prisma.user.upsert({ 
      where: { username: user.username },
      update: {}, 
      create: user, 
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

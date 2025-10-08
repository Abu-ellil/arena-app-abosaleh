require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function initDatabase() {
  try {
    console.log("🔗 Initializing database...");

    // Check if we need to create an admin user
    const adminCount = await prisma.admin.count();

    if (adminCount === 0) {
      await prisma.admin.create({
        data: {
          username: "admin",
          password: "admin123", // In a real application, hash this password!
        },
      });
      console.log("✅ Default admin user created (username: admin, password: admin123)");
    } else {
      console.log("✅ Admin user already exists. Skipping creation.");
    }

    // You might want to add initial settings here if needed
    const settingsCount = await prisma.settings.count();
    if (settingsCount === 0) {
      await prisma.settings.createMany({
        data: [
          { key: "currency", value: "D.K" },
          // Add other default settings here
        ],
      });
      console.log("✅ Default settings created.");
    } else {
      console.log("✅ Settings already exist. Skipping creation.");
    }



    console.log("✅ Database initialization complete!");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
initDatabase();

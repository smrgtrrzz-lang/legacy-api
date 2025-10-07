import "dotenv/config";
import app from "./app";
import prisma from "./prisma/client";

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

start();

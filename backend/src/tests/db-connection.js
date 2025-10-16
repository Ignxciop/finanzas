import prisma from "../lib/db.js";

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

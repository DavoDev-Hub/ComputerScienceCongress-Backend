import { prisma } from "@/lib/prisma";
import { hash } from "argon2";

async function main() {
  const passwordHash = await hash("Juanpa13");

  const admin = await prisma.administrador.create({
    data: {
      nombre: "Juan Pablo",
      correo: "al280622@edu.uaa.mx",
      passwordHash,
    },
  });
}

main()
  .catch((e) => {
    console.error("Error al crear alumno:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

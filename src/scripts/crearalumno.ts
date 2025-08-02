import { prisma } from "@/lib/prisma"
import { hash } from "argon2"

async function main() {
    const passwordHash = await hash("Juanpa13")

    const alumno = await prisma.alumno.create({
        data: {
            nombre: "Juan Pablo",
            correo: "al280622@edu.uaa.mx",
            matricula: 280622,
            semestre: 5,
            passwordHash,
        },
    })

    console.log("Alumno creado:", alumno)
}

main()
    .catch((e) => {
        console.error("Error al crear alumno:", e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })


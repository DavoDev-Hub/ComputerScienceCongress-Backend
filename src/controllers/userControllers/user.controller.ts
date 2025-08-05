import { Request, Response } from "express";
import {
  alumnoLoginSchema,
  alumnoRegisterSchema,
} from "@/schemas/userSchemas/user.schema";
import { prisma } from "@/lib/prisma";
import { verify, hash } from "argon2";
import jwt from "jsonwebtoken";
import { generarCodigoVerificacion } from "@/utils/generarCodigo";
// import { enviarCodigoVerificacion } from "@/lib/mailer";

export const loginAlumno = async (req: Request, res: Response) => {
  const parsed = alumnoLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const { correo, password } = parsed.data;

  try {
    const alumno = await prisma.alumno.findUnique({
      where: { correo },
    });

    if (!alumno) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const validPassword = await verify(alumno.passwordHash, password);

    if (!validPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: alumno.id, correo: alumno.correo, role: "alumno" },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      alumno: {
        id: alumno.id,
        nombre: alumno.nombre,
        correo: alumno.correo,
        matricula: alumno.matricula,
        semestre: alumno.semestre,
      },
    });
  } catch (err) {
    console.error("Error en loginAlumno:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const registerAlumno = async (req: Request, res: Response) => {
  const parsed = alumnoRegisterSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const { nombre, correo, matricula, semestre, password } = parsed.data;

  try {
    const existente = await prisma.alumno.findFirst({
      where: {
        OR: [{ correo }, { matricula }],
      },
    });

    if (existente) {
      return res
        .status(409)
        .json({ error: "Ya existe un alumno con ese correo o matrícula" });
    }

    const passwordHash = await hash(password);

    const nuevo = await prisma.alumno.create({
      data: {
        nombre,
        correo,
        matricula,
        semestre,
        passwordHash,
      },
    });

    return res.status(201).json({
      message: "Alumno registrado exitosamente",
      alumno: {
        id: nuevo.id,
        nombre: nuevo.nombre,
        correo: nuevo.correo,
        matricula: nuevo.matricula,
        semestre: nuevo.semestre,
      },
    });
  } catch (error) {
    console.error("Error en registerAlumno:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

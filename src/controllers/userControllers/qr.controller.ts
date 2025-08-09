import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";

const addMinutes = (d: Date, mins: number) =>
  new Date(d.getTime() + mins * 60 * 1000);

const buildQrPayload = (data: {
  id_qr: number;
  id_alumno: number;
  id_actividad?: number | null;
  id_conferencia?: number | null;
}) => {
  return JSON.stringify({
    id_qr: data.id_qr,
    id_alumno: data.id_alumno,
    id_actividad: data.id_actividad ?? null,
    id_conferencia: data.id_conferencia ?? null,
  });
};

const assertAlumnoInscritoActividad = async (
  id_alumno: number,
  id_actividad: number,
) => {
  const insc = await prisma.inscripcion.findFirst({
    where: { id_alumno, id_actividad },
    select: { id_inscripcion: true },
  });
  return !!insc;
};

// POST /user/qr/actividad/:id/generar
export const generarQRActividad = async (req: Request, res: Response) => {
  const id_alumno = req.user?.id;
  const id_actividad = Number(req.params.id);

  if (!id_alumno) return res.status(401).json({ error: "No autorizado" });
  if (!id_actividad)
    return res.status(400).json({ error: "Actividad inválida" });

  const inscrito = await assertAlumnoInscritoActividad(id_alumno, id_actividad);
  if (!inscrito)
    return res
      .status(403)
      .json({ error: "No estás inscrito a esta actividad" });

  await prisma.qr_generado.updateMany({
    where: { id_alumno, id_actividad, estado: true },
    data: { estado: false },
  });

  const ahora = new Date();
  const expira = addMinutes(ahora, 60);

  const qr = await prisma.qr_generado.create({
    data: {
      id_alumno,
      id_actividad,
      fecha_generado: ahora,
      fecha_expiracion: expira,
      estado: true,
    },
  });

  const qrPayload = buildQrPayload({
    id_qr: qr.id_qr,
    id_alumno,
    id_actividad,
  });

  return res.status(201).json({
    id_qr: qr.id_qr,
    fecha_generado: qr.fecha_generado,
    fecha_expiracion: qr.fecha_expiracion,
    estado: qr.estado,
    qrPayload,
  });
};

// GET /user/qr/actividad/:id
export const obtenerQRActividad = async (req: Request, res: Response) => {
  const id_alumno = req.user?.id;
  const id_actividad = Number(req.params.id);

  if (!id_alumno) return res.status(401).json({ error: "No autorizado" });
  if (!id_actividad)
    return res.status(400).json({ error: "Actividad inválida" });

  const qr = await prisma.qr_generado.findFirst({
    where: {
      id_alumno,
      id_actividad,
      estado: true,
      fecha_expiracion: { gt: new Date() },
    },
    orderBy: { fecha_generado: "desc" },
  });

  if (!qr)
    return res
      .status(404)
      .json({ error: "No hay QR activo para esta actividad" });

  const qrPayload = buildQrPayload({
    id_qr: qr.id_qr,
    id_alumno,
    id_actividad,
  });

  return res.json({
    id_qr: qr.id_qr,
    fecha_generado: qr.fecha_generado,
    fecha_expiracion: qr.fecha_expiracion,
    estado: qr.estado,
    qrPayload,
  });
};

// POST /user/qr/conferencia/:id/generar
export const generarQRConferencia = async (req: Request, res: Response) => {
  const id_alumno = req.user?.id;
  const id_conferencia = Number(req.params.id);

  if (!id_alumno) return res.status(401).json({ error: "No autorizado" });
  if (!id_conferencia)
    return res.status(400).json({ error: "Conferencia inválida" });

  await prisma.qr_generado.updateMany({
    where: { id_alumno, id_conferencia, estado: true },
    data: { estado: false },
  });

  const ahora = new Date();
  const expira = addMinutes(ahora, 60);

  const qr = await prisma.qr_generado.create({
    data: {
      id_alumno,
      id_conferencia,
      fecha_generado: ahora,
      fecha_expiracion: expira,
      estado: true,
    },
  });

  const qrPayload = buildQrPayload({
    id_qr: qr.id_qr,
    id_alumno,
    id_conferencia,
  });

  return res.status(201).json({
    id_qr: qr.id_qr,
    fecha_generado: qr.fecha_generado,
    fecha_expiracion: qr.fecha_expiracion,
    estado: qr.estado,
    qrPayload,
  });
};

// GET /user/qr/conferencia/:id
export const obtenerQRConferencia = async (req: Request, res: Response) => {
  const id_alumno = req.user?.id;
  const id_conferencia = Number(req.params.id);

  if (!id_alumno) return res.status(401).json({ error: "No autorizado" });
  if (!id_conferencia)
    return res.status(400).json({ error: "Conferencia inválida" });

  const qr = await prisma.qr_generado.findFirst({
    where: {
      id_alumno,
      id_conferencia,
      estado: true,
      fecha_expiracion: { gt: new Date() },
    },
    orderBy: { fecha_generado: "desc" },
  });

  if (!qr)
    return res
      .status(404)
      .json({ error: "No hay QR activo para esta conferencia" });

  const qrPayload = buildQrPayload({
    id_qr: qr.id_qr,
    id_alumno,
    id_conferencia,
  });

  return res.json({
    id_qr: qr.id_qr,
    fecha_generado: qr.fecha_generado,
    fecha_expiracion: qr.fecha_expiracion,
    estado: qr.estado,
    qrPayload,
  });
};

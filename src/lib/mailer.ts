// import nodemailer from "nodemailer";
// // Este archivo contiene la lógica para envío de correos reales.
// // El envío está temporalmente deshabilitado hasta verificar un dominio.
//
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });
//
// export async function enviarCodigoVerificacion(correo: string, codigo: string) {
//   await transporter.sendMail({
//     from: `"Congreso UAA" <${process.env.EMAIL_USER}>`,
//     to: correo,
//     subject: "Código de verificación para tu cuenta",
//     html: `
//       <h3>Hola,</h3>
//       <p>Tu código de verificación es:</p>
//       <h2 style="color:#002E5D">${codigo}</h2>
//       <p>Este código expirará en 10 minutos.</p>
//     `,
//   });
// }

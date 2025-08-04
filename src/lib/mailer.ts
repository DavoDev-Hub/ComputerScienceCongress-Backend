import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_UAA,
        pass: process.env.EMAIL_PASS_UAA
    },
    tls: {
        ciphers: "SSLv3"
    }
});

export async function enviarCodigoVerificacion(destinatario: string, codigo: string) {
    const mailOptions = {
        from: `"No-Reply UAA" <${process.env.EMAIL_USER}>`,
        to: destinatario,
        subject: "Código de verificación para tu cuenta UAA",
        html: `
      <h3>Hola,</h3>
      <p>Tu código de verificación es:</p>
      <h2 style="color: #002E5D">${codigo}</h2>
      <p>Este código expirará en 10 minutos.</p>
    `
    }

    await transporter.sendMail(mailOptions)
}

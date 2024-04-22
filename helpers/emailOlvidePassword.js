import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
      });
      
      const { email, nombre, token } = datos;

      //Enviar email
      const info = await transporter.sendMail({
        from: "Administrador de Pacientes Nutri Life",
        to: email,
        subject: 'Reestablece tu contraseña en NUTRI LIFE',
        text: 'Reestablece tu contraseña en NUTRI LIFE',
        html: `<p>Hola: ${nombre}, has solicitado reestablecer tu contraseña en Nutri Life </p>
        <p>Sigue el siguiente enlace para generar nueva contraseña: 
        <a href="${process.env.FRONTEND_URL}/login/olvide-password/${token}">Reestablecer Contraseña</a> </p>
        
        <p>Si tu no creaste esta cuenta, ignora este mensaje</p>`
      });
      console.log("Mensaje enviado: %s", info.messageId);
}


export default emailOlvidePassword
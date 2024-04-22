import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
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
        subject: 'Comprueba tu cuenta en NUTRI LIFE',
        text: 'Comprueba tu cuenta en NUTRI LIFE',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en Nutri Life </p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: 
        <a href="${process.env.FRONTEND_URL}/login/confirmar/${token}">Comprobar Cuenta</a> </p>
        
        <p>Si tu no creaste esta cuenta, ignora este mensaje</p>`
      });
      console.log("Mensaje enviado: %s", info.messageId);
}


export default emailRegistro
export const getStructureforWelcome = (verificationToken: string) => {
  return `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #4CAF50;">Hola,</h2>
  <p>Gracias por unirte, por favor verifica tu dirección de correo para poder activar tu cuenta.</p>
  <a href="http://localhost:3000/auth/verify-email?token=${verificationToken}" style="display: inline-block; padding: 10px 20px; background-color: rgb(120, 5, 245); color: white; text-decoration: none; border-radius: 5px;">
    Confirmar dirección
  </a>
</div>`;
};

export const htmlMail = `<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Correo Electrónico</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        font-size: 24px;
        color: #333333;
        text-align: center;
      }
      p {
        font-size: 16px;
        color: #666666;
        line-height: 1.5;
        text-align: center;
      }
      .btn-container {
        text-align: center;
        margin-top: 20px;
      }
      .btn {
        background-color: #007bff;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        display: inline-block;
      }
      .btn:hover {
        background-color: #0056b3;
      }
      footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #999999;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <!-- Título -->
      <h1>¡Bienvenido a nuestra plataforma!</h1>
      <!-- Descripción -->
      <p>
        Gracias por unirte a nosotros. Estamos emocionados de tenerte a bordo.
        Haz clic en el botón a continuación para comenzar tu experiencia.
      </p>
      <!-- Botón -->
      <div class="btn-container">
        <a href="https://tu-enlace.com/" class="btn">Comenzar ahora</a>
      </div>
      <!-- Footer -->
      <footer>
        <p>Si tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:soporte@tu-sitio.com">soporte@tu-sitio.com</a>.</p>
      </footer>
    </div>
  </body>
</html>`;

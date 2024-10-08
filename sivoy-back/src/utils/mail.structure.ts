export const getStructureForVerification = (verificationToken: string) => {
  return `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #1a7970;">Hola,</h2>
  <p>Gracias por unirte, por favor verifica tu dirección de correo para poder activar tu cuenta.</p>
  <a href="https://api-sivoy.onrender.com/auth/verify-email?token=${verificationToken}" style="display: inline-block; padding: 10px 20px; background-color: #df5430; color: white; text-decoration: none; border-radius: 5px;">
    Confirmar dirección
  </a>
</div>`;
};

export const getStructureforWelcome = (verificationToken: string) => {
  return `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 5px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); background-color: #ffffff;">
  <h1 style="font-size: 24px; color: #09253E; text-align: center;">¡Bienvenido a nuestra plataforma!</h1>
  <p style="font-size: 16px; color: #666666; line-height: 1.5; text-align: center;">
    Gracias por unirte a nosotros. Estamos emocionados de tenerte a bordo. Haz clic en el botón a continuación para comenzar tu experiencia.
  </p>
  <div style="text-align: center; margin-top: 20px;">
    <a href="https://api-sivoy.onrender.com/auth/verify-email?token=${verificationToken}" style="background-color: #1a7970; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; display: inline-block;">Comenzar ahora</a>
  </div>
  <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #999999;">
    <p>Si tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:soporte@tu-sitio.com">soporte@tu-sitio.com</a>.</p>
  </footer>
</div>`;
};

export const getStructureForForgotPassword = (code: string) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
  <h2 style="text-align: center; color: #09253E;">Restablece tu contraseña</h2>
  
  <p style="font-size: 16px; color: #555;">Hola,</p>

  <p style="font-size: 16px; color: #555;">
    Hemos recibido una solicitud para restablecer la contraseña asociada con esta dirección de correo. Por favor, utiliza el siguiente código para restablecer tu contraseña:
  </p>

  <div style="text-align: center; margin: 20px 0;">
    <span style="display: inline-block; font-size: 24px; padding: 10px 20px; background-color: #eaeaea; color: #333; border-radius: 5px;">
      <strong>${code}</strong>
    </span>
  </div>

  <p style="font-size: 16px; color: #555;">
    Si no solicitaste este cambio, ignora este correo o contacta con el soporte si tienes alguna duda.
  </p>

  <p style="font-size: 16px; color: #555;">
    Gracias,<br>
    El equipo de soporte
  </p>

  <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
  
  <p style="font-size: 12px; color: #888; text-align: center;">
    Si tienes problemas utilizando el código, contacta con nuestro equipo de soporte para obtener ayuda.
  </p>
</div>
  `;
};

export const getStructureForHelp = (
  email: string,
  helpType: string,
  name: string,
  message = '',
) => {
  return `
    <div style="
      font-family: Arial, sans-serif; 
      max-width: 600px; 
      margin: auto; 
      padding: 20px; 
      background-color: #ffffff; 
      border-radius: 8px; 
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
      color: #333;
    ">
      <h1 style="background-color: #09253E; color: white; padding: 10px; border-radius: 8px 8px 0 0;">
        Solicitud de ayuda: ${helpType}
      </h1>
      <div style="padding: 20px;">
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo de ayuda:</strong> ${helpType}</p>
        <p><strong>Mensaje:</strong> ${message ? message : 'No se proporcionó mensaje adicional.'}</p>
      </div>
      <p style="text-align: center; font-size: 12px; color: #777777; margin-top: 20px;">
        Este mensaje fue generado automáticamente. Por favor, no respondas directamente.
      </p>
    </div>
  `;
};

export const getStructureForContact = (
  name: string,
  email: string,
  message: string,
) => {
  return `
    <div style="
      font-family: Arial, sans-serif; 
      max-width: 600px; 
      margin: auto; 
      padding: 20px; 
      background-color: #f9f9f9; 
      border-radius: 8px; 
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
      color: #333;
    ">
      <h2 style="background-color: #09253E; color: white; padding: 10px; border-radius: 8px 8px 0 0;">
        Nuevo mensaje de contacto
      </h2>
      <div style="padding: 20px;">
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      </div>
      <p style="text-align: center; font-size: 12px; color: #777777; margin-top: 20px;">
        Este es un mensaje generado automáticamente desde el formulario de contacto.
      </p>
    </div>
  `;
};

export const donationConfirmationEmail = (name: string, amount: number) => {
  return `
    <h1 style="color: #1a7970;">¡Gracias, ${name}!</h1>
    <p>Tu donación de <strong>$${amount}</strong> ha sido recibida exitosamente.</p>
    <p>Nos ayudas a continuar con nuestro proyecto "Sí, voy".</p>
  `;
};

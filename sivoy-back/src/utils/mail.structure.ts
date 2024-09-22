const getVerificationURL = (verificationToken: string) => {
  return `http://localhost:3000/auth/verify-email?token=${verificationToken}`;
};

export const getStructureforWelcome = (verificationToken: string) => {
  return `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #4CAF50;">Hola,</h2>
  <p>Gracias por unirte, por favor verifica tu dirección de correo para poder activar tu cuenta.</p>
  <a href="${getVerificationURL(verificationToken)}" style="display: inline-block; padding: 10px 20px; background-color: rgb(120, 5, 245); color: white; text-decoration: none; border-radius: 5px;">
    Confirmar dirección
  </a>
</div>`;
};

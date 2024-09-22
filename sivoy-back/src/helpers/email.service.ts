import { PASS_EMAIL, USER_EMAIL } from '../config/envConfig';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER_EMAIL,
    pass: PASS_EMAIL,
  },
});

const sendEmailService = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: USER_EMAIL,
    to,
    subject,
    html: text,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error: any) {
    throw new Error(`Error al enviar el correo: ${error?.message}`);
  }
};

export default sendEmailService;

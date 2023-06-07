import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  try {
    // Create a transporter
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'El Alami Idriss mralami@gmail.com',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // Actually send the email
    await transport.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;

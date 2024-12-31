import nodemailer from 'nodemailer';

// Create the transporter using environment variables for sensitive data
export const sendEmail = async (to: string, message: string, subject: string = 'Patient Invitation', htmlContent: string = '') => {
  // Get email credentials from environment variables
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Email credentials are not set in environment variables');
  }

  // Create a transporter object using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,      // Using environment variable for email
      pass: EMAIL_PASS,      // Using environment variable for password
    },
  });

  const mailOptions = {
    from: EMAIL_USER,       // Using environment variable for sender email
    to,
    subject,
    text: message,          // Plain text message
    html: htmlContent,      // Optional HTML content (useful for richer formatting)
  };

  try {
    // Send the email using the created transporter
    await transporter.sendMail(mailOptions);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
      throw new Error(`Error sending email: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while sending email');
    }
  }
};

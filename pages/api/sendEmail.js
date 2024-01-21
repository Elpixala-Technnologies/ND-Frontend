import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, originalHtmlContent, trackingLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_MAIL_TO,
      pass: process.env.NEXT_PUBLIC_SMTP_PASS,
    },
  });

  // Include both the original HTML content and the tracking link in the email
  const emailContent = `
    <p>${originalHtmlContent}</p>
    <p>Track your order <a href="${trackingLink}">here</a>.</p>
  `;

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SMTP_MAIL_TO,
    to: email,
    subject: subject,
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


export default async function handler(req, res) {
  const { email, subject, originalHtmlContent, trackingLink } = req.body;

  try {
    await sendEmail(email, subject, originalHtmlContent, trackingLink);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: `Failed to send email: ${error.message}` });
  }
  
}
  
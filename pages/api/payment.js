import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { name, email, paymentId, paymentAmount, paymentDate, paymentProduct } =
    req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_MAIL_TO,
      pass: process.env.NEXT_PUBLIC_SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `${process.env.NEXT_PUBLIC_SMTP_MAIL_TO}`,
    to: email,
    subject: "Payment Successfull Done + Thank you for your order " + name,
    text: `Name: ${name}\nEmail: ${email}\n PaymentId: ${paymentId}\n PaymentAmount: ${paymentAmount}`,
    html: `<div style="background-color: #f9fafb; width: 600px; padding: 20px;">
  <h1 style="text-align: center; font-size: 18px; font-weight: 700;">Payment Info</h1>
  <div style="display: flex; justify-content: center; margin-left: 100px; padding-top: 20px;">
    <div style="text-align: start; padding-right: 20px;">
      <p><strong>Name: </strong></p>
      <p><strong>Email: </strong></p>
      <p><strong>PaymentId: </strong></p>
      <p><strong>PaymentAmount: </strong></p>
      <p><strong>PaymentDate: </strong></p>
      <p><strong>Ordered Products: </strong></p>
    </div>
    <div style="text-align: end;">
      <p>${name}</p>
      <p>${email}</p>
      <p>${paymentId}</p>
      <p>Rs. ${paymentAmount}</p>
      <p>${paymentDate}</p>
      <ul style="padding-left: 0; list-style: none;">
        ${paymentProduct.map(product => `
          <li style="padding-bottom: 20px;">
            <p><strong>Book Name: </strong>${product.book.name}</p>
            <p><strong>Quantity: </strong>${product.quantity}</p>
            <p><strong>Total Price: </strong>Rs. ${product.totalPrice}</p>
            <img src="${product.book.image[0]}" alt="${product.book.name}" style="max-width: 100px; max-height: 100px;">
          </li>
        `).join('')}
      </ul>
    </div>
  </div>
</div>`,


   };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Payment Done successful check your mailbox" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed" });
  }
}

 
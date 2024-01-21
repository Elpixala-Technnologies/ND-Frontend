import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { name, email, filterdOrder, totalPrice} =
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
    subject: "Your Order Is Delivery Successfully Done + Thank you " + name,
    text: `Name: ${name}\n Email: ${email}`,
    html: ` 
        <ul  style="padding: 10px;">
            ${filterdOrder?.book.map(product => `
                <li>
                    <p><strong>Product Name:</strong> ${product?.book?.name}</p>
                    <p><strong>Price:</strong> Rs. ${product?.book?.price}</p>
                    <p><strong>Quantity:</strong> ${product?.book?.quantity}</p>
                    <img src="${product.book.image?.[0] || ''}" alt="${product.book.name}" style="max-width: 100px; max-height: 100px;">
                </li>
            `).join('')}
            <li><strong>Total Price:</strong> Rs. ${totalPrice}</li>
        </ul>`,
   };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Order Is Dispatch successful check your mailbox" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed" });
  }
}

 
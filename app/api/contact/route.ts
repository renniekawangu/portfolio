import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, subject, email, message } = await request.json()

    // Configure Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD // Must be Gmail App Password, not regular password
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'b34stwebservices@gmail.com',
      replyTo: email,
      subject: `${subject}`,
      html: `
        <h2>${subject}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })

    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Email error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

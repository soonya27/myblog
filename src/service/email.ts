import nodemailer from "nodemailer";

export type EmailData = {
  from: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function sendEmail({ subject, from, message }: EmailData) {
  const mailData = {
    to: process.env.AUTH_USER,
    subject: `[PyeonBlog]로부터 발송된 메일.. 제목:${subject}`,
    from,
    html: `
            <img src="cid:profile" />
            <h1>제목 : ${subject}</h1>
            <div>내용 : ${message}</div>
            <br/>
            <p>보낸사람 : ${from}</p>
        `,
  };
  return transporter.sendMail(mailData);
}

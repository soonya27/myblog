# My Portfolio Website with Next.js

## [website link](https://myblog-eta-azure.vercel.app/)

📸This project is my portfolio website where you can explore my projects, learn more about me, and get in touch with me. 🚀

(이 프로젝트는 지금 보고 계신 포트폴리오 사이트입니다.
프론트엔드에는 Next.js와 tailwindCss로 제작되었고, 데이터 소스는 정적인 json파일을 이용하였습니다.
저를 소개하는 about me, project및 공부자료를 정리한 posts, 저에게 메일을 발송할 수 있는 contact로 구성되어있습니다.
vercel을 이용하여 배포하였습니다.)


## 🌟Features (주요 기능)

- 직접 제작한 이미지 소스를 이용하여 디자인한 메인화면 및 비쥬얼
- react-multi-carousel과 grid를 이용한 posts목록
- posts : category별로 router를 이용한 sorting기능
- post detail -> react-markdown을 이용하여 markdown 커스텀
- Contact me : nodemailer를 이용한 메일 발송 기능
- 메일 발송 완료 팝업(modal portal)

## 🌟Tech Stack (기술 스택)

- **Frontend:**
  - Next.js
  - React.js
  - TypeScript
  - Tailwind CSS

- **Backend:**
  - Static JSON files

- **Others:**
  - Git (Version control)
  - Prettier (Code formatting and static analysis)

- **Deployment:**
  - Vercel

## 🌟Feedback
I'm always looking to improve! If you have any feedback, suggestions, or bug reports, feel free to open an issue or reach out to me directly.
Thank you for visiting my portfolio website!

( 항상 개선을 위한 피드백, 제안 또는 버그 신고를 환영합니다! 언제든지 문제를 제기하거나 저에게 직접 문의해 주세요.
 제 홈페이지를 방문해 주셔서 감사합니다!)




## 🌟mail전송 Code block

### src/app/api/contact/route.ts
```js
import { sendEmail } from '@/service/email';
import * as yup from 'yup';

const bodySchema = yup.object().shape({
    from: yup.string().email().required(),
    subject: yup.string().required(),
    message: yup.string().required(),
});

export async function POST(req: Request) {
    const body = await req.json();
    if (!bodySchema.isValidSync(body)) {
        return new Response(JSON.stringify({ message: '유효하지 않은 포멧' }), { status: 400 });
    }

    return sendEmail(body)
        .then(() => new Response(JSON.stringify({ message: '메일 전송 성공' }),
            { status: 200 })
        ).catch((error) => {
            console.log(error);
            return new Response(JSON.stringify({ message: '메일 전송 실패' }),
                { status: 500 })
        })
}
```


### src/service/email.ts
```js
import nodemailer from 'nodemailer';

export type EmailData = {
    from: string;
    subject: string;
    message: string;
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
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
        attachments: [
            {
                filename: "sub_bg.jpg",
                path: "public/images/profile_imge.jpg",
                cid: "profile"
            }
        ]
    }
    return transporter.sendMail(mailData);
}
```
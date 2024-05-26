# Instagram Clone with Next.js (인스타그램 클론 코딩)

## [website link](https://next-js-instagram-clone.vercel.app/)

📸🌟This project is a web application that mimics the basic functionalities of Instagram. It is built using Next.js for the frontend, Sanity.io for the backend and database, and utilizes Next.js API routes for custom backend functionalities.
The project allows users to upload images, like posts, leave comments, follow and unfollow other users, and view user profile pages.
The project is deployed using Vercel. 🚀

###

(이 프로젝트는 Instagram의 기본 기능들을 모방한 웹 사이트입니다.

프론트엔드에는 Next.js, 백엔드 및 데이터베이스에는 Sanity.io를 사용하여 구축되었으며 백엔드는 Next.js API route를 이용합니다.

사용자의 이미지 업로드, 게시물 좋아요, 댓글 남기기, 다른 사용자 팔로우 및 언팔로우, 사용자 프로필 페이지 보기 등의 기능을 사용할 수 있습니다.

vercel을 이용하여 배포하였습니다.)


## 🌟Features (주요 기능)

- User account creation and authentication with google (google을 통한 사용자 계정 생성 및 로그인) - NextAuth
- Image uploading (이미지 및 코멘트 게시물 업로드)
- View Post Detail (게시글 상세보기 - modal portal)
- Liking posts and commenting (게시물 좋아요 및 댓글 작성)
- Following and unfollowing other users (다른 사용자 팔로우 및 팔로잉)
- User profile pages (사용자 프로필 페이지)
- Search User (사용자 검색)

## 🌟Tech Stack (기술 스택)

- **Frontend:**
  - Next.js
  - React.js
  - Tailwind CSS
  
  - SWR
  - react-multi-carousel
  - react-spinners
  - react-icons
  - timeago.js

- **Backend:**
  - Next Auth Google Login
  - Next.js API Routes (Custom backend)
  - Sanity.io (Database)

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



## 🌟Type Code block

### 📁src/model/user.ts
```js
export type AuthUser = {
    id: string;
    name: string;
    email: string;
    username: string;
    image?: string;
}

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>

export type HomeUser = AuthUser & {
    following: SimpleUser[];
    followers: SimpleUser[];
    bookmarks: string[];
}

export type SearchUser = AuthUser & {
    following: number;
    followers: number;
}

export type ProfileUser = SearchUser & {
    posts: number;
}
```

### 📁src/model/post.ts
```js
export type Comment = {
    comment: string;
    username: string;
    image?: string | undefined;
}

export type SimplePost = Omit<FullPost, "comments"> & {
    comments: number;
}

export type FullPost = {
    id: string;
    username: string;
    userImage: string;
    image: string;
    text: string;
    createdAt: string;
    likes: string[];
    comments: Comment[];
}
```


## 🌟NextAuth - AuthOptions Code block
### 📁src/util/authOptions.ts
```js
import { addUser } from '@/service/user';
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
        }),
    ],
    callbacks: {
        async signIn({ user: { id, name, image, email } }) {
            if (!email) {
                return false;
            }
            addUser({
                id: id,
                name: name || '',
                username: email?.split('@')[0] || '',
                image: image ?? undefined,
                email,
            })
            return true;
        },
        async session({ session, token }) {
            const user = session?.user;
            if (user) {
                session.user = {
                    ...user,
                    username: user.email?.split('@')[0] || '',
                    id: token.id as string,
                }
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/signin',
    }
}

```
import { readFile } from 'fs/promises';
import path from 'path';

export type Post = {
    title: string;
    description: string;
    date: Date;
    category: string;
    path: string;
    featured: boolean;
}

//기존 Post 객체에 + content 추가
export type PostData = Post & { content: string }


export async function getAllPosts(): Promise<Post[]> {
    const filePath = path.join(process.cwd(), 'data', 'posts.json');
    return readFile(filePath, 'utf-8')
        .then<Post[]>(JSON.parse)// then(data=> JSON.parse(data) 생략)
        .then(posts => posts.sort((a, b) => (a.date > b.date ? -1 : 1)))
}

export async function getFeaturedPosts(): Promise<Post[]> {
    return getAllPosts()
        .then(posts => posts.filter(post => post.featured))
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
    return getAllPosts()
        .then(posts => posts.filter(post => !post.featured))
}


export async function getFilteredPosts(filter?: string | null): Promise<Post[]> {
    return getAllPosts()
        .then(posts => filter ? posts.filter(post => post.category === filter) : posts)
}

export async function getPostDetail(id: string): Promise<PostData> {
    const filePath = path.join(process.cwd(), 'data', `/posts/${id}.md`);

    //목록으로부터 -> 제목,설명에 대한 데이터
    const metadata = await getAllPosts()
        .then(posts => posts.find(post => post.path === id))
    if (!metadata) throw new Error(`${id}에 해당하는 파일 없음`)

    //detail 내용파일
    const content = await readFile(filePath, 'utf-8');

    return { ...metadata, content };
}


import path from "path";
import { readFile } from "fs/promises";

export type Post = {
  title: string;
  description: string;
  date: Date;
  thumbnailPath: string;
  contentPath: string;
};

export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

export const getAllPosts = async (): Promise<Post[]> => {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  const data = await readFile(filePath, "utf-8");
  const posts: Post[] = JSON.parse(data);
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const getPostData = async (fileName: string): Promise<PostData> => {
  const posts = await getAllPosts();
  const post = posts.find((post) => post.contentPath === fileName);
  if (!post) throw new Error(`${fileName} 포스트가 없습니다.`);

  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  const content = await readFile(filePath, "utf-8");

  const index = posts.indexOf(post);
  const prev = index !== 0 ? posts[index - 1] : null;
  const next = index !== posts.length - 1 ? posts[index + 1] : null;

  return { ...post, content, next, prev };
};

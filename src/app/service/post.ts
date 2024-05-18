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

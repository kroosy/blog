import path from "path";
import { readFile } from "fs/promises";

export type Post = {
  title: string;
  description: string;
  date: Date;
  thumbnailPath: string;
};

export const getAllPosts = async () => {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  const data = await readFile(filePath, "utf-8");
  const posts: Post[] = JSON.parse(data);
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
};

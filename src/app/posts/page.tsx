import { Metadata } from "next";
import Hero from "../components/Hero";
import PostGrid from "../components/PostGrid";
import { getAllPosts } from "../service/post";

export const metadata: Metadata = {
  title: "Posts",
  description: "개발 관련 포스트",
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Hero />
      <section className="mt-6">
        <PostGrid posts={posts} />
      </section>
    </>
  );
}

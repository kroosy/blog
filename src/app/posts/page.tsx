import Hero from "../components/Hero";
import PostGrid from "../components/PostGrid";
import { getAllPosts } from "../service/post";

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

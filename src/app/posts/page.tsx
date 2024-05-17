import PostGrid from "../components/PostGrid";
import { getAllPosts } from "../service/post";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <section>
      <PostGrid posts={posts} />
    </section>
  );
}

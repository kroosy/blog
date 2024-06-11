import { Post } from "../service/post";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

export default function PostGrid({ posts }: Props) {
  return (
    <ul className="px-6 grid grid-cols-1 gap-16 lg:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <li key={post.title}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}

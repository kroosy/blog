import Link from "next/link";
import { Post } from "../service/post";

type Props = {
  type: "prev" | "next";
  post: Post;
};

export default function PrevNextPost({
  type,
  post: { title, date, contentPath },
}: Props) {
  const linkLabel = type === "prev" ? "이전글" : "다음글";
  const arrowLabel = type === "prev" ? `⇠ ${title}` : `${title} ⇢`;
  return (
    <div className="flex flex-col mt-14">
      <h2 className="font-semibold tracking-tighter text-2xl mb-6">
        {linkLabel}
      </h2>
      <Link href={`/posts/${contentPath}`} className="hover:cursor-pointer">
        <h2 className="mb-3 text-3xl font-semibold tracking-tighter md:text-4xl">
          {arrowLabel}
        </h2>
        <time className="italic tracking-tighter text-slate-500">
          {date.toString()}
        </time>
      </Link>
    </div>
  );
}

import MarkdownViewr from "@/app/components/MarkdownViewr";
import { getPostData } from "@/app/service/post";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params: { slug } }: Props) {
  const contentPath = decodeURI(slug);
  const { title, date, content } = await getPostData(contentPath);
  return (
    <article className="px-6 mx-auto w-full max-w-3xl">
      <div className="py-8 md:py-10 lg:py-12">
        <Link
          href={"/posts"}
          className="font-semibold tracking-tight text-slate-400"
        >
          ← 돌아가기
        </Link>
      </div>
      <section className="mb-10 prose prose-slate lg:prose-xl max-w-none">
        <h1>{title}</h1>
        <time className="italic tracking-tighter text-slate-500">
          {date.toString()}
        </time>
      </section>
      <MarkdownViewr text={content} />
    </article>
  );
}

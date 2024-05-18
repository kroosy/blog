import MarkdownViewr from "@/app/components/MarkdownViewr";
import PrevNextPost from "@/app/components/PrevNextPost";
import { getPostData } from "@/app/service/post";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params: { slug } }: Props) {
  const contentPath = decodeURI(slug);
  const { title, date, content, next, prev } = await getPostData(contentPath);
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
      <section className="mt-6 md:mt-10 flex flex-col-reverse md:flex-row md:justify-between">
        {prev && <PrevNextPost type="prev" post={prev} />}
        {next && <PrevNextPost type="next" post={next} />}
      </section>
    </article>
  );
}

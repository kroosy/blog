import MarkdownViewr from "@/app/components/MarkdownViewr";
import PrevNextPostArea from "@/app/components/PrevNextPostArea";
import { getPostData } from "@/app/service/post";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const contentPath = decodeURI(slug);
  const { title, description } = await getPostData(contentPath);
  return {
    title: title,
    description: description,
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const contentPath = decodeURI(slug);
  const { title, date, content, next, prev } = await getPostData(contentPath);
  return (
    <article className="px-4 mx-auto w-full max-w-3xl md:px-0">
      <div className="py-8 md:py-10 lg:py-12">
        <Link
          href={"/posts"}
          className="font-semibold tracking-tight text-slate-400"
        >
          ← 돌아가기
        </Link>
      </div>
      <section className="mb-10 prose prose-slate lg:prose-xl max-w-none dark:prose-invert">
        <h1>{title}</h1>
        <time className="italic tracking-tighter text-slate-500">
          {date.toString()}
        </time>
      </section>
      <MarkdownViewr text={content} />
      <PrevNextPostArea prev={prev} next={next} />
    </article>
  );
}

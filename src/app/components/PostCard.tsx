import Image from "next/image";
import { Post } from "../service/post";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostCard({
  post: { title, date, description, thumbnailPath, contentPath },
}: Props) {
  return (
    <Link href={`/posts/${contentPath}`}>
      <article className="grid grid-cols-1 items-start gap-6 overflow-hidden group hover:cursor-pointer">
        <div className="aspect-[19/10] relative">
          <Image
            src={`/images/posts/${thumbnailPath}.png`}
            alt={title}
            width={750}
            height={400}
            objectFit="cover"
            className="group-hover:scale-105 transition-all"
          />
        </div>
        <div className="flex flex-col my-2 gap-2">
          <h3 className="font-semibold text-3xl md:text-4xl break-keep">
            {title}
          </h3>
          <time className="italic">{date.toString()}</time>
          <p className="md:text-lg">{description}</p>
        </div>
      </article>
    </Link>
  );
}

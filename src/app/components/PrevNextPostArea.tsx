import { Post } from "../service/post";
import PrevNextPost from "./PrevNextPost";

type Props = {
  prev: Post | null;
  next: Post | null;
};

export default function PrevNextPostArea({ prev, next }: Props) {
  return (
    <section className="mt-6 md:mt-10 flex flex-col-reverse gap-5 md:flex-row md:justify-between">
      {prev && <PrevNextPost type="prev" post={prev} />}
      {next && <PrevNextPost type="next" post={next} />}
    </section>
  );
}

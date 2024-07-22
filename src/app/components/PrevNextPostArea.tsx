import { Post } from "../service/post";
import PrevNextPost from "./PrevNextPost";

type Props = {
  prev: Post | null;
  next: Post | null;
};

export default function PrevNextPostArea({ prev, next }: Props) {
  return (
    <section className="mt-6 md:mt-10 flex flex-col-reverse gap-4 md:flex-row md:justify-between">
      <div className="md:w-1/2">
        {prev && <PrevNextPost type="prev" post={prev} />}
      </div>
      <div className="md:w-1/2">
        {next && <PrevNextPost type="next" post={next} />}
      </div>
    </section>
  );
}

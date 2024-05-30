import { Post } from "../service/post";
import PrevNextPost from "./PrevNextPost";

type Props = {
  prev: Post | null;
  next: Post | null;
};

export default function PrevNextPostArea({ prev, next }: Props) {
  return (
    <section className="mt-6 md:mt-10 flex flex-col-reverse md:flex-row md:justify-between">
      {prev && <PrevNextPost type="prev" post={prev} />}
      {next && (
        <div className="flex flex-1 md:justify-end">
          <PrevNextPost type="next" post={next} />
        </div>
      )}
    </section>
  );
}

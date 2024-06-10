import { Metadata } from "next";
import WorkInProgress from "../components/WorkInProgress";

export const metadata: Metadata = {
  title: "About",
  description: "소개",
};

export default function AboutPage() {
  return (
    <section className="h-full mx-4 ">
      <WorkInProgress name="About 페이지는" />
    </section>
  );
}

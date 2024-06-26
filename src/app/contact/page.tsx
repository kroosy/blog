import { Metadata } from "next";
import WorkInProgress from "../components/WorkInProgress";

export const metadata: Metadata = {
  title: "Contact",
  description: "연락",
};

export default function ContactPage() {
  return (
    <section className="h-full mx-4 ">
      <WorkInProgress name="Contact 페이지는" />
    </section>
  );
}

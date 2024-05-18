import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-10 px-4 py-10 md:px-6 md:py-12  lg:py-14 ">
      <nav>
        <ul className="flex justify-center gap-10">
          <li className="font-semibold text-xl">
            <Link href="/posts">Posts</Link>
          </li>
          <li className="font-semibold text-xl">
            <Link href="/about">About</Link>
          </li>
          <li className="font-semibold text-xl">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

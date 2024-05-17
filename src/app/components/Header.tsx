import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="px-4 py-8 md:px-6 md:py-10 lg:py-12 ">
      <nav>
        <ul className="flex justify-center gap-10">
          <li className="font-semibold">
            <Link href="/posts">Posts</Link>
          </li>
          <li className="font-semibold">
            <Link href="/about">About</Link>
          </li>
          <li className="font-semibold">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

import Link from "next/link";
import React from "react";
import Hero from "./Hero";

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-10 px-4 py-8 md:px-6 md:py-10 lg:py-12 ">
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
      <Hero />
    </header>
  );
}

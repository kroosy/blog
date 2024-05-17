import Image from "next/image";
import React from "react";
import profileImage from "../../../public/kangaroo.png";

export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-2">
      <Image
        src={profileImage}
        alt="profile image"
        width={150}
        height={150}
        className="rounded-full"
        priority
      />
      <h2 className="text-2xl">kroosy</h2>
      <h3 className="text-lg">개발 나무에 물 주는 중.. 🌳</h3>
    </section>
  );
}

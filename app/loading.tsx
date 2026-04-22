"use client";

import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <div>
        <Image src="/public/logo.png"
         alt="logo" height={32} width={32}/>
      </div>
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2  font-bold text-green-500 tracking-widest flex gap-2">
        <span className="text-2xl">Synapse</span>
        <span className="text-zinc-200 text-xl">by 404</span>
      </p>
    </div>
  );
}
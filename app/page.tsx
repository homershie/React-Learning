"use client";

import Link from "next/link";
import GarminCalculator from "./components/GarminCalculator";

export default function Home() {
  return (
    <main>
      <nav className="fixed top-5 right-5 z-50 flex gap-2.5">
        <Link
          href="/"
          className="px-5 py-2.5 bg-white/90 text-indigo-500 no-underline rounded-lg font-semibold shadow-lg transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-xl"
        >
          Garmin 計算器
        </Link>
        <Link
          href="/practices"
          className="px-5 py-2.5 bg-white/90 text-indigo-500 no-underline rounded-lg font-semibold shadow-lg transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-xl"
        >
          🎯 面試練習
        </Link>
      </nav>
      <GarminCalculator />
    </main>
  );
}

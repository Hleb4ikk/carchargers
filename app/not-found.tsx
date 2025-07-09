"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="text-xl grow flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p>
        Страница <span className="text-3xl font-bold">{pathname}</span> не
        найдена
      </p>
      <Link className="text-blue-500 hover:text-purple-400" href="/">
        Вернуться на главную
      </Link>
    </div>
  );
}

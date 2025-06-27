"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Filter } from "../Catalog/Filter/Filter";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      if (inputRef.current) {
        inputRef.current.value = query;
      }
    }
  }, []);

  function handleInput() {
    const query = inputRef.current?.value;
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params}`);
  }

  return (
    <div className="flex gap-6">
      <Filter />
      <input
        ref={inputRef}
        className="border-1 border-[#e0e0e0] rounded-lg p-2 w-full"
        type="text"
        placeholder="Введите название устройства или модель зарядки..."
      />
      <button
        type="submit"
        className="cursor-pointer bg-green-500 text-white px-4 rounded-lg"
        onClick={() => handleInput()}
      >
        Поиск
      </button>
    </div>
  );
};

export default Search;

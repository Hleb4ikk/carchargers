"use client";

import { FilterItem } from "@/components/Catalog/Filter/Filter";
import { ChangeEvent, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useUrlParams } from "@/hooks/useUrlParams";

const PriceFilter = () => {
  const searchParams = useSearchParams();

  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  const { getParam, setParam } = useUrlParams();

  useEffect(() => {
    setMin(getParam("min") ?? "");
  }, [searchParams]);

  useEffect(() => {
    setMax(getParam("max") ?? "");
  }, [searchParams]);

  useEffect(() => setParam("min", min), [min]);
  useEffect(() => setParam("max", max), [max]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    setStateCallback: Dispatch<SetStateAction<string>>
  ) {
    const value = e.target.value.trim();

    if (Number(value) >= 0) {
      setStateCallback(value);
    }
  }

  return (
    <FilterItem itemName="Цена" className="flex items-center gap-2">
      <input
        type="text"
        className="max-w-[75px] border-1 border-[#e0e0e0] rounded-lg p-2"
        placeholder="от"
        value={min}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setMin)}
      />
      -
      <input
        type="text"
        className="max-w-[75px] border-1 border-[#e0e0e0] rounded-lg p-2"
        placeholder="до"
        value={max}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setMax)}
      />
    </FilterItem>
  );
};

export default PriceFilter;

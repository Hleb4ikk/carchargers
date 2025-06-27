"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@/components/Card/Card";

import { ChargerCard as ChargerCardSpecs } from "@/entities/chargerCard";
import { useEffect, useState } from "react";
import { ChargerCardSkeleton } from "@/components/Skeleton/Skeleton";
import ChargerCard from "../ChargerCard/ChargerCard";
import { useSearchParams } from "next/navigation";

const Catalog = () => {
  const [chargers, setChargers] = useState<ChargerCardSpecs[]>([]);
  const [filteredChargers, setFilteredChargers] = useState<ChargerCardSpecs[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("http://localhost:3000/api/chargers")
      .then((response) => response.json())
      .then((data) => {
        setChargers(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const activeFilters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      activeFilters[key] = value.split(",");
    });

    const filtered = chargers.filter((charger) => {
      return Object.entries(activeFilters).every(([key, values]) => {
        switch (key) {
          case "query":
            return values.some((value) =>
              charger.title.toLowerCase().includes(value.toLowerCase())
            );
          case "min":
            return values.some(
              (value) => Number(charger.price) >= Number(value)
            );
          case "max":
            return values.some(
              (value) => Number(charger.price) <= Number(value)
            );
          default:
            const chargerValue = String(
              charger[key as keyof ChargerCardSpecs] ?? "не указано"
            ).toLowerCase();
            return values.some((value) =>
              chargerValue.includes(value.toLowerCase())
            );
        }
      });
    });

    setFilteredChargers(filtered);
  }, [chargers, searchParams]);

  return (
    <Card className="p-4 border-1 rounded-lg border-[#e0e0e0] flex flex-col gap-3">
      <CardHeader className="font-bold text-2xl">Каталог Продуктов</CardHeader>
      <Separator />
      <CardContent
        style={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ChargerCardSkeleton key={index} />
            ))
          : filteredChargers.map((charger) => (
              <ChargerCard key={charger.id} charger={charger} />
            ))}
      </CardContent>
    </Card>
  );
};

export default Catalog;

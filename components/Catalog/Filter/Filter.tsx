"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter as FilterIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import PriceFilter from "../PriceFilter/PriceFilter";
import { LoaderCircle } from "lucide-react";
import { useUrlParams } from "@/hooks/useUrlParams";

type FilterOption = {
  key: string;
  label: string;
  type: "select";
  variants: string[];
};

type FilterState = Record<string, string[]>;

export const Filter = () => {
  const filtersRef = useRef<FilterOption[]>([]);
  const [selected, setSelected] = useState<FilterState>({});
  const [loading, setLoading] = useState(false);
  const { setMultipleParams, getAllParams } = useUrlParams();

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchFilters() {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/filters");
      const data: FilterOption[] = await res.json();
      if (JSON.stringify(data) !== JSON.stringify(filtersRef.current)) {
        filtersRef.current = data;
        console.log("filters changed");
      }
      setLoading(false);
    }

    fetchFilters();
  }, []);

  useEffect(() => {
    setSelected(getAllParams());
  }, [searchParams]);

  useEffect(() => {
    setMultipleParams(selected);
  }, [selected]);

  const toggleVariant = (key: string, value: string) => {
    setSelected((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      const nextFilters = {
        ...prev,
        [key]: updated,
      };

      return nextFilters;
    });
  };

  return (
    <Sheet>
      <SheetTrigger className="group cursor-pointer">
        <FilterIcon className="group-hover:fill-black transition-all" />
      </SheetTrigger>
      <SheetContent className="bg-white" side="left">
        <ScrollArea className="h-[100vh]">
          <div className="flex flex-col h-[100vh]">
            <SheetHeader>
              <SheetTitle className="font-bold text-2xl">Фильтры</SheetTitle>
            </SheetHeader>
            {!loading && filtersRef.current ? (
              <form className="px-5 space-y-4">
                <PriceFilter />
                {filtersRef.current.map((filter) => (
                  <FilterItem itemName={filter.label} key={filter.key}>
                    {filter.variants.map((variant) => (
                      <div key={variant} className="flex gap-2 items-center">
                        <input
                          id={`${filter.key}-${variant}`}
                          type="checkbox"
                          checked={
                            selected[filter.key]?.includes(variant) || false
                          }
                          onChange={() => toggleVariant(filter.key, variant)}
                        />
                        <label htmlFor={`${filter.key}-${variant}`}>
                          {variant}
                        </label>
                      </div>
                    ))}
                  </FilterItem>
                ))}
              </form>
            ) : (
              <div className="grow flex justify-center items-center">
                <LoaderCircle size={52} className="animate-spin " />
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export const FilterItem = ({
  children,
  itemName,
  className,
}: {
  children: React.ReactNode;
  itemName: string;
  className?: string;
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={itemName}>
        <AccordionTrigger className="text-lg font-normal">
          {itemName}
        </AccordionTrigger>
        <AccordionContent className={twMerge(`px-2`, className)}>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

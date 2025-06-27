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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import PriceFilter from "../PriceFilter/PriceFilter";

import { useUrlParams } from "@/hooks/useUrlParams";
import { get } from "http";

type FilterOption = {
  key: string;
  label: string;
  type: "select";
  variants: string[];
};

type FilterState = Record<string, string[]>;

export const Filter = () => {
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [selected, setSelected] = useState<FilterState>({});

  const { setMultipleParams, getAllParams } = useUrlParams();

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchFilters() {
      const res = await fetch("http://localhost:3000/api/filters");
      const data: FilterOption[] = await res.json();
      setFilters(data);
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
          <SheetHeader>
            <SheetTitle className="font-bold text-2xl">Фильтры</SheetTitle>
          </SheetHeader>
          <form className="px-5 space-y-4">
            <PriceFilter />
            {filters.map((filter) => (
              <FilterItem itemName={filter.label} key={filter.key}>
                {filter.variants.map((variant) => (
                  <div key={variant} className="flex gap-2 items-center">
                    <input
                      id={`${filter.key}-${variant}`}
                      type="checkbox"
                      checked={selected[filter.key]?.includes(variant) || false}
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

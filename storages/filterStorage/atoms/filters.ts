"use client";

import { atom } from "jotai";

interface Variant {
  name: string;
}

interface RangeVariant extends Variant {
  min: number;
  max: number;
}

export class Filter {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class RangeFilter extends Filter {
  variant: RangeVariant;
  constructor(name: string, variant: RangeVariant) {
    super(name);
    this.variant = variant;
  }
}

export class CheckFilter extends Filter {
  variants: Variant[];
  constructor(name: string, variants: Variant[]) {
    super(name);
    this.variants = variants;
  }
}

export function generateFilterAtom(filter: Filter) {
  return atom(filter);
}

export function hydrateFilter(raw: any): Filter {
  if (raw.variant) {
    return new RangeFilter(raw.name, raw.variant);
  }
  if (raw.variants) {
    return new CheckFilter(raw.name, raw.variants);
  }
  throw new Error("Unknown filter type");
}

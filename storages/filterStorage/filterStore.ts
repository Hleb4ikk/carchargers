import { createStore } from "jotai";
import {
  generateFilterAtom,
  Filter,
  RangeFilter,
  CheckFilter,
  hydrateFilter,
} from "./atoms/filters";

const filtersRes = async () => (await fetch("/filters.json")).json();
const rawFilters = await filtersRes().json();
const filters = rawFilters.map(hydrateFilter);

const filterStore = createStore();

export const filterAtomMap = new Map<
  string,
  ReturnType<typeof generateFilterAtom>
>();

for (const filter of filters) {
  const atom = generateFilterAtom(filter);
  if (atom) filterAtomMap.set(filter.name, atom);

  filterStore.sub(atom, () => {
    console.log(
      filterStore.get(atom).name + " changed to " + filterStore.get(atom)
    );
  });
}

import { ChargerCard } from "@/entities/chargerCard";
import * as fs from "fs";

function getDataFrom(filename: string) {
  try {
    return JSON.parse(fs.readFileSync(filename, "utf8"));
  } catch (err) {
    return null;
  }
}

function getPhotosById(id: number): string[] | null {
  const chargers: ChargerCard[] = getDataFrom("chargers.json");

  if (chargers) {
    const charger = chargers.find((charger) => charger.id === id);
    if (charger && charger.photos.length > 0) {
      return charger.photos;
    }
  }

  return null;
}

export { getDataFrom, getPhotosById };

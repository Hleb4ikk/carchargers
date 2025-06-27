import {
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@/components/Card/Card";
import Search from "@/components/Search/Search";
import Catalog from "@/components/Catalog/Catalog";
import { Filter } from "@/components/Catalog/Filter/Filter";

export default function CatalogPage() {
  return (
    <div className="flex flex-col gap-4 ">
      <Card className="p-4 border-1 rounded-lg border-[#e0e0e0] flex flex-col gap-3">
        <CardHeader className="font-bold text-2xl">Поиск устройства</CardHeader>
        <Separator />
        <CardContent>
          <Search />
        </CardContent>
      </Card>
      <Catalog />
    </div>
  );
}

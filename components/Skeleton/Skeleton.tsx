import {
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@/components/Card/Card";

const ChargerCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className="p-4 border-1 rounded-lg border-[#e0e0e0] flex flex-col gap-2">
      <CardHeader>
        <ChargerCardPhotoSkeleton />
      </CardHeader>

      <CardContent className="flex gap-2 flex-col">
        <h2 className="w-full h-[25px] bg-[#e0e0e0] animate-pulse rounded-lg" />
        <p className="w-full h-[15px] bg-[#e0e0e0] animate-pulse rounded-lg" />
        <p className="w-full h-[15px] bg-[#e0e0e0] animate-pulse rounded-lg" />
      </CardContent>
    </Card>
  );
};

const ChargerCardSkeletons = () => {
  return (
    <>
      <ChargerCardSkeleton />
      <ChargerCardSkeleton />
      <ChargerCardSkeleton />
      <ChargerCardSkeleton />
      <ChargerCardSkeleton />
    </>
  );
};

const ChargerCardPhotoSkeleton = () => {
  return (
    <>
      <div className="w-full h-[200px] bg-[#e0e0e0] animate-pulse rounded-lg" />
    </>
  );
};

export { ChargerCardSkeleton, ChargerCardSkeletons, ChargerCardPhotoSkeleton };

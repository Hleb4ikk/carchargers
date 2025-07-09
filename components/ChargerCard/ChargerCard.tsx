import {
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@/components/Card/Card";
import { ChargerCard as Charger } from "@/entities/chargerCard";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ChargerCardPhotoSkeleton } from "../Skeleton/Skeleton";
import { SubmitProductForm } from "../SubmitProductForm/SubmitProductForm";
import SubmitButton from "../SubmitProductForm/SubmitButton/SubmitButton";
import { Button } from "../ui/button";

const ChargerCard = ({ charger }: { charger: Charger }) => {
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      const imageNames = charger.photos;

      const imagePromises = await Promise.all(
        imageNames.map((imageName) =>
          fetch(
            `http://localhost:3000/api/image?adId=${charger.id}&filename=${imageName}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "image/jpeg",
              },
            }
          )
        )
      );

      const imageURLs = await Promise.all(
        imagePromises.map((imagePromise) => imagePromise.blob())
      );
      console.log(imageURLs.length);
      setPhotoURLs(imageURLs.map((imageURL) => URL.createObjectURL(imageURL)));
      setLoading(false);
    }
    fetchPhotos();
    return () => {
      for (const imageURL of photoURLs) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, []);

  return (
    <Card
      key={charger.id}
      className="p-4 border-1 rounded-lg border-[#e0e0e0] flex flex-col gap-2 "
    >
      <CardHeader>
        {loading ? (
          <ChargerCardPhotoSkeleton />
        ) : (
          <Carousel className="group rounded-lg">
            <CarouselContent className="transition-opacity group-hover:opacity-50">
              {photoURLs.map((photoURL, index) => (
                <CarouselItem
                  className="aspect-1/1 flex justify-center items-center"
                  key={index}
                >
                  <img
                    className="object-cover"
                    src={photoURL}
                    alt={charger.title}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant={"ghost"}
              className="left-1 opacity-0 disabled:opacity-0 group-hover:disabled:opacity-50 group-hover:opacity-100 transition-opacity"
            />
            <CarouselNext
              variant={"ghost"}
              className="right-1 opacity-0 disabled:opacity-0 group-hover:disabled:opacity-50 group-hover:opacity-100 transition-opacity"
            />
          </Carousel>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="flex gap-2 flex-col max-h-[200px]">
        <h2 className="font-bold text-lg line-clamp-2">{charger.title}</h2>
        <p>{charger.countryOfOrigin}</p>
        <p>BYN {charger.price}</p>
      </CardContent>
      <SubmitProductForm
        productImageUrl={photoURLs[0]}
        productTitle={charger.title}
        productPrice={charger.price}
        trigger={
          <Button className="w-full border-1 border-green-500 cursor-pointer hover:bg-green-500 hover:text-white">
            Купить
          </Button>
        }
        submitButton={
          <SubmitButton className="bg-green-500 border-1 border-green-500 text-white cursor-pointer hover:bg-white hover:text-green-500">
            Отправить
          </SubmitButton>
        }
      />
    </Card>
  );
};

export default ChargerCard;

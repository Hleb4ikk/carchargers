import { Button } from "@/components/ui/button";
import { Input } from "../../Input/Input";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export const ProductCounter = ({
  productPrice,
  name,
}: {
  productPrice: number;
  name: string;
}) => {
  const [counter, setCounter] = useState<number>(1);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    const numericValue = Number(value);

    if (numericValue >= 1 || value === "") {
      setCounter(numericValue);
    } else {
      setCounter(1);
    }
  }
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          className="cursor-pointer text-lg border-black border-1"
          size={"sm"}
          children={<Minus />}
          onClick={() => {
            if (counter > 1) setCounter(counter - 1);
          }}
        />
        <Input
          className="h-8 max-w-16"
          onChange={handleChange}
          value={counter}
          name={name}
        />
        <Button
          type="button"
          className="cursor-pointer text-lg border-black border-1"
          size={"sm"}
          children={<Plus />}
          onClick={() => setCounter(counter + 1)}
        />
      </div>
      <p>{productPrice * counter} BYN</p>
    </div>
  );
};

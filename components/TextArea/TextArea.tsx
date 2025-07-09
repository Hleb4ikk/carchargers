import { PropsWithChildren, TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const TextArea = ({
  placeholder,
  className,
  ...props
}: PropsWithChildren<TextareaHTMLAttributes<HTMLTextAreaElement>>) => {
  return (
    <textarea
      className={twMerge(
        "resize-none border-1 border-[#e0e0e0] rounded-lg p-2 w-full",
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  );
};

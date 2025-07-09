import { twMerge } from "tailwind-merge";

export const Input = ({
  placeholder,
  type,
  className,
  ...props
}: React.PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement>>) => {
  return (
    <input
      type={type}
      className={twMerge(
        `border-1 border-[#e0e0e0] rounded-lg p-2 w-full`,
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  );
};

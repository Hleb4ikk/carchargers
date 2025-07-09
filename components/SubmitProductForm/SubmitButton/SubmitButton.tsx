import { Button } from "@/components/ui/button";

const SubmitButton = ({
  children,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <Button {...props} type="submit">
      {children}
    </Button>
  );
};

export default SubmitButton;

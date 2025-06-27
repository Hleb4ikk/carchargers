import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

const CardHeader = ({
  children,
  ...props
}: { children?: React.ReactNode } & HTMLAttributes<HTMLElement>) => {
  return <h2 {...props}>{children}</h2>;
};

const CardContent = ({
  children,
  ...props
}: { children?: React.ReactNode } & HTMLAttributes<HTMLElement>) => {
  return <div {...props}>{children}</div>;
};
const Separator = () => {
  return <hr className="border-gray-300 border-1" />;
};

const Card = ({
  children,
  ...props
}: { children?: React.ReactNode } & HTMLAttributes<HTMLElement>) => {
  return <article {...props}>{children}</article>;
};

export { Card, CardHeader, CardContent, Separator };

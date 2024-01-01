import { ReactNode } from "react";

interface TitleContainerProps {
  className?: string;
  title: string;
  children?: ReactNode;
}

const TitleContainer = (
  { className, title, children }: TitleContainerProps,
) => {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {title && (
        <span className="text-base font-semibold mb-2 underline-offset-4 underline">
          {title}
        </span>
      )}
      {children}
    </div>
  );
};

export default TitleContainer;

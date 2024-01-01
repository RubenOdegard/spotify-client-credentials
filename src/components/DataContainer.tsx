import { ReactNode } from "react";

interface DataContainerProps {
  className?: string;
  title: string;
  value?: string | number;
  children?: ReactNode;
}

const DataContainer = (
  { className, title, value, children }: DataContainerProps,
) => {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {title && <span className="text-xs font-semibold flex-wrap">{title}
      </span>}
      {value && <p className="text-emerald-200">{value}</p>}
      {children}
    </div>
  );
};

export default DataContainer;

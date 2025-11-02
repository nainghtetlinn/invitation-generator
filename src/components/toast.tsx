import { Info } from "lucide-react";

interface ToastProps {
  title: string;
}

export const Toast = (props: ToastProps) => {
  return (
    <div
      role="alert"
      className="alert alert-error"
    >
      <Info />
      <span>{props.title}</span>
    </div>
  );
};

import "./ActionButton.css";
import { ComponentProps } from "react";

type ActionButtonProps = ComponentProps<"button"> & {
  outline?: boolean;
};

export function ActionButton({
  onClick,
  children,
  className,
  outline,
  ...rest
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`action-btn btn btn-primary-brand ${
        outline ? "btn-primary-brand-outline" : ""
      } d-flex justify-content-center gap-3 align-items-center ${
        className ? className : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

import './ActionButton.css';
import { ComponentProps } from "react";

type ActionButtonProps = ComponentProps<"button"> & {
    outline?: boolean;
}

export function ActionButton({ onClick, children, className, outline }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`action-btn btn btn-primary-brand${outline ? '-outline hover-brand' : 'hover-'} d-flex justify-content-center gap-3 align-items-center ${className}`}
    >
      {children}
    </button>
  );
}

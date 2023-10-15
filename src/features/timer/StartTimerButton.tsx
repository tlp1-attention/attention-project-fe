import { ActionButton } from "@features/ui/action-button/ActionButton";
import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button">;

export function StartTimerButton({ onClick, ...rest }: ButtonProps) {
  return (
    <ActionButton onClick={onClick} outline={false} {...rest}>
      <i className="bi bi-plus-circle fs-2"></i>
      Nuevo Temporizador
    </ActionButton>
  );
}

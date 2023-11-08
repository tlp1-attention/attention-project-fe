import { ActionButton } from "@features/ui/action-button/ActionButton";
import { ButtonProps } from "./StartTimerButton";

export function StopTimerButton({ onClick, disabled }: ButtonProps) {
  return (
    <ActionButton onClick={onClick} outline={true} disabled={disabled}>
      <i className="bi bi-x-lg fs-2"></i>
      Parar el temporizador
    </ActionButton>
  );
}

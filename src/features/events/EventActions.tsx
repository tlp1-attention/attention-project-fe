import { ActionButton } from "@features/ui/action-button/ActionButton";
import { EventFilters } from "./EventFilters";

export function EventActions({
  onAddClick
}: {
  onAddClick: React.MouseEventHandler;
}) {
  return (
    <div className="d-flex color-brand gap-3 align-items-stretch mx-2">
      <AddEventButton onClick={onAddClick} />
      <NotifyButton />
      <EventFilters />
    </div>
  );
}

function AddEventButton({ onClick }: { onClick: React.MouseEventHandler }) {
  return (
    <>
      <ActionButton outline={true} id="new-event" onClick={onClick}>
        <i className="bi bi-plus-circle fs-2"></i>
        <span className="visually-hidden">Nuevo evento</span>
      </ActionButton>
    </>
  );
}

function NotifyButton() {
  return (
    <ActionButton outline={true}>
      <i className="bi bi-bell bi-bell-fill fs-2"></i>
      <span className="visually-hidden">Notíficame</span>
    </ActionButton>
  );
}


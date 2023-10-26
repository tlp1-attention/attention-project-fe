import { ActionButton } from "@features/ui/action-button/ActionButton";
import { EventFilters } from "./EventFilters";
import { useState } from "react";
import { useNotifications } from "./hooks/useNotifications";
import { ValidationError } from "@interfaces/validation.error";
import toast from "react-hot-toast";
import { subscribe, unsubscribe } from "diagnostics_channel";

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
  const { notificationsAllowed, subscribe, unsubscribe } = useNotifications()!;

  const promptNotifications = async () => {
    const permission = await Notification.requestPermission();
    try {
    if (permission == "granted") {
    } else {
      void unsubscribe();
    }} catch(err) {

        if (err instanceof ValidationError) {
          toast.error(err.message);
        }
    }
  }

  return (
    <ActionButton outline={true}>
      <i className="bi bi-bell-fill fs-2"></i>
      <span className="visually-hidden">Notíficame</span>
    </ActionButton>
  );
}



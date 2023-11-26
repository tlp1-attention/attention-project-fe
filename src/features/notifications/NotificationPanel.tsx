import { INotification } from "@interfaces/notification";
import { useEffect, useRef, useState } from "react";
import { NotificationItem } from "./NotificationItem";
import "./NotificationList.css";
import { useSocketContext } from "@features/real-time/context/useSocketContext";
import { Serialized } from "@interfaces/serialized";

export function NotificationPanel() {
  const { socket } = useSocketContext()!;
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const isFirstOpen = useRef(true);
  const [show, toggle] = useState(false);

  const newNotifications = notifications.filter(n => !n.read).length;

  useEffect(() => {
    socket?.emit("get-notifications");
  }, [socket]);

  useEffect(() => {
    socket?.on(
      "all-notifications",
      (notifications: Serialized<INotification>[]) => {
        const parsedNotifications: INotification[] = notifications.map(n => {
          return {
            ...n,
            createdAt: new Date(n.createdAt),
            updatedAt: new Date(n.updatedAt)
          };
        });
        setNotifications(parsedNotifications);
      }
    );
    return () => {
      socket?.off("all-notifications");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("new-notification", (notification: INotification) => {
      setNotifications(notifications => [...notifications, notification]);
    });
    return () => {
      socket?.off("new-notification");
    };
  }, [socket]);

  const handleOpen = () => {
    if (!isFirstOpen.current) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      socket?.emit(
        "read-notifications",
        notifications.map(n => n.id)
      );
    }
    toggle(show => !show);
    isFirstOpen.current = false;
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".notification-container")) return;
      toggle(false);
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleClearNotifications = () => {
    socket?.emit('clear-notifications');
  }

  return (
    <div className="notification-container">
      <div
        className={`list-group notification-panel shadow-lg ${
          show ? "show" : ""
        }`}
      >
        <div className="p-2 d-flex w-100 justify-content-between align-items-center">
          <h3 className="p-2">Notificaciones</h3>
          <button className="btn pointer-event" onClick={handleClearNotifications}>
            <i className="bi bi-trash fs-3"></i>
            <span className="visually-hidden">Borrar notificaciones</span>
          </button>
        </div>
        <ul className="list-unstyled">
          {notifications.length > 0 &&
            notifications.map(note => (
              <NotificationItem key={note.id} notification={note} />
            ))}
          {notifications.length == 0 && (
            <li className="d-flex text-brand fs-2 justify-content-center align-items-center p-4">
              <div className="py-2 px-1 d-flex justify-content-center align-items-center flex-column gap-2">
                <div className="empty-notifications">
                  <img
                    src="/assets/icons8-notifications-100.png"
                    alt="Una carta cerrada con un signo de llamada de atención"
                    className="empty-notifications-img"
                  />
                </div>
                <h6 className="fw-bold fs-3">No tienes notificaciones aún</h6>
                <p className="fs-5 text-balance lead">
                  ¡Completa actividades y mantente informado!
                </p>
              </div>
            </li>
          )}
        </ul>
      </div>

      <button
        onClick={handleOpen}
        className="notification-panel-toggle shadow-sm"
      >
        <i className={`bi bi-${!show ? 'chat-square' : 'x-lg'}`}></i>
        <span className="visually-hidden">Expandir notificaciones</span>
        {newNotifications > 0 && (
          <span className="new-notifications">{newNotifications}</span>
        )}
      </button>
    </div>
  );
}

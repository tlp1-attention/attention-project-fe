import { INotification } from "@interfaces/notification";
import { useEffect, useRef, useState } from "react";
import { NotificationItem } from "./NotificationItem";
import "./NotificationList.css";
import letterIcon from "../../../public/assets/icons8-notifications-100.png";
import { useSocketContext } from "@features/real-time/context/useSocketContext";


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
    socket?.on("all-notifications", (notifications: INotification[]) => {
      setNotifications(notifications);
    });
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
      socket?.emit('read-notifications', notifications.map(n => n.id));
    }
    toggle(show => !show);
    isFirstOpen.current = false;
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".notification-container")) return;
      toggle(false);
    }

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    }

  }, []);

  return (
    <div className="notification-container">
      <ul
        className={`list-group notification-panel shadow-lg ${
          show ? "show" : ""
        }`}
      >
        {notifications.length > 0 &&
          notifications.map(note => (
            <NotificationItem key={note.id} notification={note} />
          ))}
        {notifications.length == 0 && (
          <li className="d-flex text-brand fs-2 justify-content-center align-items-center p-4">
            <div className="py-2 px-1 d-flex justify-content-center align-items-center flex-column gap-2">
              <div className="empty-notifications">
                <img
                  src={letterIcon}
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

      <button
        onClick={handleOpen}
        className="notification-panel-toggle shadow-sm"
      >
        <i className="bi bi-chat-square"></i>
        <span className="visually-hidden">Expandir notificaciones</span>
        {newNotifications > 0 && (
          <span className="new-notifications">{newNotifications}</span>
        )}
      </button>
    </div>
  );
}

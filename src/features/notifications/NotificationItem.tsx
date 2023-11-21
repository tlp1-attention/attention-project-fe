import { INotification } from "@interfaces/notification";

type NotificationItemProps = {
  notification: INotification;
};
export function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <li className="notification-item list-group-item-action list-group-item">
      <img
        src={notification.type.iconUrl}
        alt={`Notificación ${notification.type.description}`}
      />
      <div className="col">
        <h6 className="fs-4 text-brand fw-bold">{notification.title}</h6>
        <p>{notification.content}</p>
      </div>
      <span
        className={`read-circle ${!notification.read ? "" : "opacity-0"}`}
      ></span>
    </li>
  );
}

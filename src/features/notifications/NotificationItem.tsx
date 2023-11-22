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
      <div className="col p-2">
        <h6 className="fs-3 text-brand fw-bold">{notification.title}</h6>
        <p className="lead fs-4 m-0">{notification.content}</p>
      </div>
      <span
        className={`read-circle ${!notification.read ? "" : "opacity-0"}`}
      ></span>
    </li>
  );
}

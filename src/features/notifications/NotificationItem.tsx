import { INotification } from "@interfaces/notification";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

type NotificationItemProps = {
  notification: INotification;
};
export function NotificationItem({ notification }: NotificationItemProps) {
  // If the notification is a collaboration event,
  // then it includes the user.
  const isCollaboration = notification.typeId == 4;
  const requestedContactId = notification.requestedContactUserId;

  return (
    <>
      {isCollaboration ? (
        <Link to={`/workspace/colaboration/${requestedContactId}`} className="text-decoration-none">
          <NotificationBody notification={notification} />
        </Link>
      ) : (
        <NotificationBody notification={notification} />
      )}
    </>
  );
}

function NotificationBody({ notification }: { notification: INotification }) {
  return (
    <li className="notification-item list-group-item-action list-group-item">
      <img
        src={notification.type.iconUrl}
        alt={`Notificación ${notification.type.description}`}
      />
      <div className="p-2 w-100">
        <h6 className="fs-3 text-brand fw-bold">{notification.title}</h6>
        <div className="d-flex justify-content-between align-items-baseline w-100 gap-2">
          <p className="lead fs-4 m-0">{notification.content}</p>
          <small className="text-muted flex-shrink-1">
            {dayjs(notification.createdAt).format("DD/MM hh:mm")}
          </small>
        </div>
      </div>
      <span
        className={`read-circle flex-shrink-0 flex-grow-0 ${
          !notification.read ? "" : "opacity-0"
        }`}
      ></span>
    </li>
  );
}

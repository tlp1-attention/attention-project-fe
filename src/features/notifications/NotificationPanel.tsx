import { useReducer, useState } from "react";
import { INotification } from "@interfaces/notification";
import "./NotificationList.css";
import { ITypeNotification } from "@interfaces/type-notification";

const types: ITypeNotification[] = [
  {
    id: 1,
    description: "Type 1 Description",
    iconUrl: "https://example.com/icon1.png"
  },
  {
    id: 2,
    description: "Type 2 Description",
    iconUrl: "https://example.com/icon2.png"
  },
  {
    id: 3,
    description: "Type 3 Description",
    iconUrl: "https://example.com/icon3.png"
  },
  {
    id: 4,
    description: "Type 4 Description",
    iconUrl: "https://example.com/icon4.png"
  },
  {
    id: 5,
    description: "Type 5 Description",
    iconUrl: "https://example.com/icon5.png"
  }
];

const MOCK_NOTIFICATIONS: INotification[] = [
  {
    id: 1,
    title: "Notification Title 1",
    content: "Notification Content 1",
    typeId: 1,
    read: false,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: types[0]
  },
  {
    id: 2,
    title: "Notification Title 2",
    content: "Notification Content 2",
    typeId: 2,
    read: true,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: types[1]
  },
  {
    id: 3,
    title: "Notification Title 3",
    content: "Notification Content 3",
    typeId: 3,
    read: false,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: types[2]
  },
  {
    id: 4,
    title: "Notification Title 4",
    content: "Notification Content 4",
    typeId: 4,
    read: true,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: types[3]
  },
  {
    id: 5,
    title: "Notification Title 5",
    content: "Notification Content 5",
    typeId: 5,
    read: false,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: types[4]
  }
];

export function NotificationPanel() {
  const [notifications] = useState(MOCK_NOTIFICATIONS);
  const [show, toggle] = useReducer(show => !show, false);

  return (
    <div className="notification-container">
        <ul className={`list-group notification-panel ${show ? 'show' : ''}`}>
          {notifications.map(note => (
            <NotificationItem key={note.id} notification={note} />
          ))}
        </ul>

      <button onClick={toggle} className="notification-panel-toggle shadow-sm">
        <i className="bi bi-chat-square"></i>
        <span className="visually-hidden">Expandir notificaciones</span>
      </button>
    </div>
  );
}

type NotificationItemProps = {
  notification: INotification;
};

function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <li className="notification-item list-group-item-action list-group-item">
      <img
        src={notification.type.iconUrl}
        alt={`Notificación ${notification.type.description}`}
      />
      <h6>{notification.title}</h6>
      <p>{notification.content}</p>
    </li>
  );
}

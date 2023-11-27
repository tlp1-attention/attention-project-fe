import { useContext } from "react";
import { EventNotificationContext } from "../context/NotificationContext";

export const useNotifications = () => useContext(EventNotificationContext);

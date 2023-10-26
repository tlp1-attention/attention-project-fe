import { useAuth } from "@features/auth/hooks/useAuth";
import { subscribeToNotifications, unsubscribeToNotifications } from "@services/events";
import { createContext, useState, useEffect } from "react";

type NotificationContextValue = {
  notificationsAllowed: boolean;
  subscribe: () => void;
  unsubscribe: () => void;
};

export const NotificationContext = createContext<
    NotificationContextValue | null
>(null);

export function NotificationContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth()!;
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const notificationsAllowed = publicKey != null;

  useEffect(() => {
    const key = localStorage.getItem('vapidPublicKey');
    setPublicKey(key);
  }, []);

  useEffect(() => {
    if (!publicKey) return;
    localStorage.setItem('vapidPublicKey', publicKey);
  }, [publicKey]);

  const subscribe = async () => {
    if (!token) return;
    const { publicKey: key } = await subscribeToNotifications({ token });
    setPublicKey(key);
  }

  const unsubscribe = async () => {
    if (!token) return;
    await unsubscribeToNotifications({ token });
    setPublicKey(null);
  }

  return (
    <NotificationContext.Provider value={{
        notificationsAllowed,
        subscribe,
        unsubscribe,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

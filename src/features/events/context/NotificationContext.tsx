import { useAuth } from "@features/auth/hooks/useAuth";
import {
  getPublicKey,
  subscribeToNotifications,
  unsubscribeToNotifications
} from "@services/events";
import { createContext, useCallback, useEffect, useState } from "react";

type EventNotificationContextValue = {
  notificationsAllowed: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
};

export const EventNotificationContext = createContext<EventNotificationContextValue | null>(
  null
);

export function EventNotificationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth()!;
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  const notificationsAllowed = publicKey != null;
  console.log("Public key: ", publicKey, "Allowed?: ", notificationsAllowed);
  useEffect(() => {
    if (!publicKey) return;
    localStorage.setItem("vapidPublicKey", publicKey);
  }, [publicKey]);

  useEffect(() => {
    setPublicKey(localStorage.getItem("vapidPublicKey"));
  }, [setPublicKey]);

  const loadPublicKey = useCallback(async () => {
    if (!token) return;
    const key = await getPublicKey({ token });
    return key;
  }, [token]);

  const clearPublicKey = () => {
    setPublicKey(null);
    setSubscription(null);
  };

  const registerWorker = async () => {
    if (!publicKey) return;
    if (subscription) return subscription;
    const registration = await navigator.serviceWorker.register(
      "/js/worker.js"
    );

    const subscriptionResult = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey
    });
    return subscriptionResult;
  };

  const subscribe = async () => {
    if (!token) return;
    const key = await loadPublicKey();
    setPublicKey(key);
    const subscription = await registerWorker();
    if (!subscription) return;
    await subscribeToNotifications({
      token,
      subscription
    });
  };

  const unsubscribe = async () => {
    if (!token) return;
    clearPublicKey();
    await unsubscribeToNotifications({ token });
  };

  return (
    <EventNotificationContext.Provider
      value={{
        notificationsAllowed,
        subscribe,
        unsubscribe
      }}
    >
      {children}
    </EventNotificationContext.Provider>
  );
}

import { useSocket } from "@features/real-time/context/useSocket";
import { ReactNode, createContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextValue = {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
  online: boolean;
};

export const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const fullUrl = new URL('/', import.meta.env.VITE_BACKEND_URL);
  const {
    socket,
    disconnect,
    connect,
    online
  } = useSocket(fullUrl.toString());

  return <SocketContext.Provider value={{
    socket,
    connect,
    disconnect,
    online
  }}>{children}</SocketContext.Provider>;
}

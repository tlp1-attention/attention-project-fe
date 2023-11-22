import { useSocket } from "@features/real-time/hooks/useSocket";
import { ReactNode, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

type SocketContextValue = {
  socket: Socket | null;
  connect: (extraHeaders: Record<string, string>) => void;
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

  useEffect(() => {
    if (socket && !online) {
      toast.error('El socket se ha desconectado');
    } else if (socket && online) {
      toast.success('Socket de vuelta en línea');
    }
  }, [socket, online]);

  return <SocketContext.Provider value={{
    socket,
    connect,
    disconnect,
    online
  }}>{children}</SocketContext.Provider>;
}

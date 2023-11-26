import { useAuth } from "@features/auth/hooks/useAuth";
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

const fullUrl = new URL('/', import.meta.env.VITE_BACKEND_URL);

export function SocketProvider({ children }: { children: ReactNode }) {
  const { token, logout } = useAuth()!;
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

  // Automatically connect if user is authenticated
  useEffect(() => {
    if (token) {
      connect({ authorization: `${token}` });
    }
  }, [token, connect]);

  // Automatically disconnect if user is not authenticated
  useEffect(() => {
    if (!token) {
      disconnect();
    }
  }, [token, disconnect]);

  // If the server disconnects with an error, log the user out
  useEffect(() => {
    socket?.on('disconnect', (reason: string) => {
      if (reason == 'io server disconnect') {
        logout();
      }
    });
  }, [socket, logout]);

  return <SocketContext.Provider value={{
    socket,
    connect,
    disconnect,
    online
  }}>{children}</SocketContext.Provider>;
}

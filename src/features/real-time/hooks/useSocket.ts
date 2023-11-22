import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';

export const useSocket = (serverPath: string) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [online, setOnline] = useState<boolean>(false);
    const connectSocket = useCallback((extraHeaders: Record<string, string>) => {
        const socketTemp = io(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            ...extraHeaders
        });
        setSocket(socketTemp);
    }, [serverPath]);

    const disconnectSocket = useCallback(() => {
        socket?.disconnect();
    }, [socket]);

    useEffect(() => {
        setOnline(socket?.connected ?? false);
    }, [socket]);
    
    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [socket])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [socket])

    return {
        socket,
        online,
        connect: connectSocket,
        disconnect: disconnectSocket
    }
}
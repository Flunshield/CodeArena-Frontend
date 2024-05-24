import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuthContext } from "../../AuthContext";
import { JwtPayload } from "jwt-decode";
import { DataToken } from "../../Interface/Interface";
import MessageInput from './MessageInput';
import Messages from './Messages';

export interface chatInterface {
    userId: number;
    username: string;
    body: string;
    timestamp: number;
}

export default function Chat() {
    const authContext = useAuthContext();

    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;

    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<chatInterface[]>([]);
    const userId = infos.data.id ?? null;
    const username = infos.data.userName ?? null;

    const send = (value: string) => {
        if (userId && username) {
            socket?.emit('message', { userId, username, body: value, timestamp: new Date().toISOString() });
        } else {
            console.error('User ID or username is not available');
        }
    }

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_BASE_URL_BACK as string);
        setSocket(newSocket);

        newSocket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [setSocket]);

    return (
        <>
            <Messages messages={messages} />
            <MessageInput send={send} />
        </>
    )
}

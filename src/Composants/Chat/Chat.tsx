import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { ChatInterface, ChatProps  } from '../../Interface/chatInterface';
import Messages from './Messages';
import MessageInput from './MessageInput';


const Chat = ({ roomId, userId, username }: ChatProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<ChatInterface[]>([]);

    const send = (value: string) => {
        if (userId && username) {
            const message = { userId, username, body: value, timestamp: new Date().toISOString(), roomId };
            socket?.emit('message', message);
        } else {
            console.error('User ID or username is not available');
        }
    };

    useEffect(() => {
        const newSocket = io('http://localhost:3000'); // Adjust the URL based on your backend configuration
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Socket connected, joining room:', roomId);
            if (roomId) {
                newSocket.emit('joinRoom', roomId);
            }
        });

        newSocket.on('message', (message: ChatInterface) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);

    return (
        <>
            <Messages messages={messages} />
            <MessageInput send={send} />
        </>
    );
}

export default Chat;

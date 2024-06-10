import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { ChatInterface, ChatProps } from '../../Interface/chatInterface';
import Messages from './Messages';
import MessageInput from './MessageInput';

const Chat = ({ roomId, userId, username }: ChatProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<ChatInterface[]>([]);
    const [typingUsers, setTypingUsers] = useState<{ userId: number; username: string }[]>([]);

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

        newSocket.on('typing', (payload: { isTyping: boolean; userId: number; username: string }) => {
            if (payload.isTyping) {
                setTypingUsers(prevUsers => {
                    const existingUser = prevUsers.find(user => user.userId === payload.userId);
                    if (!existingUser) {
                        return [...prevUsers, { userId: payload.userId, username: payload.username }];
                    }
                    return prevUsers;
                });
            } else {
                setTypingUsers(prevUsers => prevUsers.filter(user => user.userId !== payload.userId));
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);

    const handleTyping = (isUserTyping: boolean) => {
        if (socket) {
            socket.emit('typing', { roomId, isTyping: isUserTyping, userId, username });
        }
    };

    return (
        <>
            <Messages messages={messages} typingUsers={typingUsers} />
            <MessageInput send={send} setTyping={handleTyping} />
        </>
    );
};

export default Chat;

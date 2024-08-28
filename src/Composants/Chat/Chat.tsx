import { useState, useEffect } from 'react';
import { VITE_API_BASE_URL_BACK } from "../../Helpers/apiHelper.ts";
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
        const newSocket = io(`${VITE_API_BASE_URL_BACK}`); // Adjust the URL based on your backend configuration
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
        <div className="flex flex-col h-full w-[500px]">
            <div className="flex-1 overflow-y-auto">
                <Messages messages={messages} typingUsers={typingUsers} />
            </div>
            <div className="py-2">
                <MessageInput send={send} setTyping={handleTyping} />
            </div>
        </div>
    );
};
export default Chat;

import { useState, useEffect, useRef } from 'react';
import { VITE_API_BASE_URL_BACK } from "../../Helpers/apiHelper.ts";
import io, { Socket } from 'socket.io-client';
import { ChatInterface, ChatProps } from '../../Interface/chatInterface';
import Messages from './Messages';
import MessageInput from './MessageInput';

const Chat = ({ roomId, userId, username, setShowNotification, setNotificationMessage, setNotificationType }: ChatProps) => {
    const [messages, setMessages] = useState<ChatInterface[]>([]);
    const [typingUsers, setTypingUsers] = useState<{ userId: number; username: string }[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Récupérer l'ID de session de la socket depuis le localStorage
        const sessionId = localStorage.getItem(`socketSessionId_${userId}`);

        // Initialiser la socket
        socketRef.current = io(`${VITE_API_BASE_URL_BACK}`, {
            query: { sessionId }, // Envoyer l'ID de session si disponible
        });

        // Vérification que socketRef.current n'est pas null
        socketRef.current?.on('connect', () => {
            if (socketRef.current && socketRef.current.id) {
                localStorage.setItem(`socketSessionId_${userId}`, socketRef.current.id); // Sauvegarder l'ID de session
            }
            if (roomId && socketRef.current) {
                socketRef.current.emit('joinRoom', roomId);
            }
        });

        // Gérer les messages reçus
        socketRef.current?.on('message', (message: ChatInterface) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Gérer les événements de "typing"
        socketRef.current?.on('typing', (payload: { isTyping: boolean; userId: number; username: string }) => {
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

        // Nettoyer la connexion lors du démontage du composant
        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, [roomId, userId]);

    const send = (value: string) => {
        if (userId && username && socketRef.current) {
            const message = { userId, username, body: value, timestamp: new Date().toISOString(), roomId };
            socketRef.current.emit('message', message);
        } else {
            console.error('User ID, username, or socket is not available');
        }
    };

    const handleTyping = (isUserTyping: boolean) => {
        if (socketRef.current) {
            socketRef.current.emit('typing', { roomId, isTyping: isUserTyping, userId, username });
        }
    };

    return (
        <div className="flex flex-col h-full w-[500px]">
            <div className="flex-1 overflow-y-auto">
                <Messages messages={messages} typingUsers={typingUsers} setShowNotification={setShowNotification} setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType}/>
            </div>
            <div className="py-2">
                <MessageInput send={send} setTyping={handleTyping} />
            </div>
        </div>
    );
};

export default Chat;

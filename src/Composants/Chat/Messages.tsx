import { useEffect, useRef } from 'react';
import { ChatInterface } from '../../Interface/chatInterface';
import { useAuthContext } from "../../AuthContext";
import { JwtPayload } from "jwt-decode";
import { DataToken } from "../../Interface/Interface";
import useMatchmaking from "../../hook/useMatchmaking";
import { useNavigate } from 'react-router-dom';


interface MessagesProps {
    messages: ChatInterface[];
    typingUsers: { userId: number; username: string }[];
    setShowNotification: (value: boolean) => void;
    setNotificationMessage: (value: string) => void;
    setNotificationType: (value: string) => void;
}

const Messages = ({ messages, typingUsers, setShowNotification, setNotificationMessage, setNotificationType}: MessagesProps) => {
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const id = infos.data.id;

    const { resetMatchState, setMatchEnded } = useMatchmaking();
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };
    const navigate = useNavigate();

    useEffect(() => {
        const systemMessage = messages.find(message => message.userId === 0 && message.end === true);
        
        if (systemMessage) {
            setNotificationType('info');
            setNotificationMessage(systemMessage.body || 'La partie est terminé !' );
            setShowNotification(true);
            setTimeout(() => {
                resetMatchState();
                setMatchEnded(true);
                navigate(0);
            }, 3000);
        }
    }, [messages, resetMatchState, navigate]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, typingUsers]);

    const getInitials = (username: string) => {
        return username
            .split(' ')
            .map((name) => name.charAt(0))
            .join('');
    };

    return (
        <div className="flex w-full flex-col gap-4 p-4 max-w-2xl mx-auto bg-tertiari rounded-lg shadow-lg h-[500px] overflow-y-auto" ref={messagesContainerRef}>
            {messages.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Pas de message ici</p>
            ) : (
                messages.map((message) => {
                    const isCurrentUser = message.userId === id;
                    const isSystemMessage = message.userId === 0;
                    const initials = getInitials(message.username).toUpperCase();

                    return (
                        <div
                            key={message.timestamp}
                            className={`flex items-end gap-2 ${isSystemMessage ? 'justify-center' : isCurrentUser ? 'ml-auto' : 'mr-auto'
                                }`}
                        >
                            {!isSystemMessage && !isCurrentUser && (
                                <span className="flex items-center justify-center overflow-hidden text-sm font-bold tracking-wider border rounded-full size-8 border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                    {initials}
                                </span>
                            )}

                            <div
                                className={`flex flex-col p-4 text-sm min-w-[200px] ${isSystemMessage
                                    ? 'bg-green-600 text-white rounded-xl text-center'
                                    : isCurrentUser
                                        ? 'ml-auto max-w-[80%] md:max-w-[60%] rounded-l-xl rounded-tr-xl bg-blue-700 text-slate-100 dark:bg-blue-600 dark:text-slate-100'
                                        : 'mr-auto max-w-[80%] md:max-w-[60%] rounded-r-xl rounded-tl-xl bg-slate-100 text-black dark:bg-slate-800 dark:text-tertiari'
                                    }`}
                            >
                                {!isSystemMessage && !isCurrentUser && (
                                    <span className="font-semibold">{message.username}</span>
                                )}
                                <div className={`text-sm ${isSystemMessage ? '' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {message.body}
                                </div>
                                <span className="ml-auto text-xs">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </span>
                            </div>

                            {!isSystemMessage && isCurrentUser && (
                                <span className="flex items-center justify-center overflow-hidden text-sm font-bold tracking-wider border rounded-full size-8 border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                    {initials}
                                </span>
                            )}
                        </div>
                    );
                })
            )}

            {typingUsers.map(user => {
                const isCurrentUser = user.userId === id;
                return (
                    <div key={user.userId} className="flex items-end gap-2">
                        {!isCurrentUser && (
                            <span className="flex items-center justify-center overflow-hidden text-sm font-bold tracking-wider border rounded-full size-8 border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                {getInitials(user.username)}
                            </span>
                        )}
                        <div className={`flex gap-1 ${isCurrentUser ? 'ml-auto' : 'mr-auto'}`}>
                            <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-slate-300"></span>
                            <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_0.5s_ease-in-out_infinite] dark:bg-slate-300"></span>
                            <span className="size-1.5 rounded-full bg-slate-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-slate-300"></span>
                        </div>
                        {isCurrentUser && (
                            <span className="flex items-center justify-center overflow-hidden text-sm font-bold tracking-wider border rounded-full size-8 border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                {getInitials(user.username)}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Messages;

import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

interface ChatInterface {
    userId: number;
    username: string;
    body: string;
    timestamp: string;
    roomId: string;
}

interface ChatProps {
    roomId: string;
    userId: number;
    username: string;
}

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

const Messages = ({ messages }: { messages: ChatInterface[] }) => {
    return (
        <div className="messages-container flex flex-col gap-4 p-4 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {messages.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No messages yet</p>
            ) : (
                messages.map((message, index) => (
                    <div className="message-item flex items-start gap-4 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md animate-fadeIn" key={index}>
                        <div className="avatar bg-blue-500 text-white rounded-full flex items-center justify-center w-10 h-10">
                            {message.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="message-content flex flex-col w-full">
                            <div className="message-header flex items-center justify-between mb-1">
                                <span className="username text-sm font-semibold text-gray-900 dark:text-white">{message.username}</span>
                                <span className="timestamp text-xs font-normal text-gray-500 dark:text-gray-400">{new Date(message.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="body text-sm font-normal text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 p-2 rounded-md">{message.body}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

const MessageInput = ({ send }: { send: (value: string) => void }) => {
    const [value, setValue] = useState<string>('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim() !== '') {
            send(value);
            setValue('');
        }
    };

    const handleSend = () => {
        if (value.trim() !== '') {
            send(value);
            setValue('');
        }
    };

    return (
        <div className="flex gap-1">
            <input
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tape ton msg"
                value={value}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4"
            />
            <button
                className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                onClick={handleSend}
            >
                envoie
                <svg
                    className="w-5 h-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    ></path>
                </svg>
            </button>
        </div>
    );
}

export default Chat;

import React, { useState } from 'react';

interface MessageInputProps {
    send: (value: string) => void;
    setTyping: (isTyping: boolean) => void;
}

const MessageInput = ({ send, setTyping }: MessageInputProps) => {
    const [value, setValue] = useState<string>('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim() !== '') {
            send(value);
            setValue('');
            setTyping(false);
        }
    };

    const handleSend = () => {
        if (value.trim() !== '') {
            send(value);
            setValue('');
            setTyping(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setTyping(e.target.value.trim() !== '');
    };

    return (
        <div className="flex gap-1">
            <input
                onChange={handleChange}
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

export default MessageInput;
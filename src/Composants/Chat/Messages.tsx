import { chatInterface } from "./Chat";

export default function Messages({ messages }: { messages: chatInterface[] }) {
    console.log('Rendering messages:', messages); // Log the messages to be rendered

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

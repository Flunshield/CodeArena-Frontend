import { chatInterface } from "./Chat";
export default function Messages({ messages }: { messages: chatInterface[] }) {
    return (
        <div>
            {messages.map((message, index) => (
            <div className="flex items-start gap-2.5" key={index}>
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700 mb-3">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.username}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.body}</p>
            </div>
        </div>
            ))}
        </div>
    )
}
export interface ChatInterface {
    userId: number;
    username: string;
    body: string;
    timestamp: string;
    roomId: string;
}

export interface ChatProps {
    roomId: string;
    userId: number;
    username: string;
}
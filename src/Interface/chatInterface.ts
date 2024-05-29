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

export interface MatchFoundEvent {
    userId1: number;
    userId2: number;
    roomId: string;
}
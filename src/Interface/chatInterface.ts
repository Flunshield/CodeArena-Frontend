export interface ChatInterface {
    userId: number;
    username: string;
    body: string;
    timestamp: string;
    roomId: string;
    end: boolean;
}

export interface ChatProps {
    roomId: string;
    userId: number;
    username: string;
    setShowNotification: (value: boolean) => void
    setNotificationMessage: (value: string) => void
    setNotificationType: (value: string) => void
}

export interface MatchFoundEvent {
    userId1: number;
    userId2: number;
    roomId: string;
    puzzle: Puzzle;
    startTimestamp: number;
}

export interface Puzzle {
    id: number;
    rankingsID: number;
    tournamentID: number | null;
    eventsID: number | null;
    tests: {
        success: boolean;
        testPassed: string[];
        testFailed: string[];
    };
    details: string;
    title: string;
}

export interface Test {
    name: string;
    condition: string;
    successMessage: string;
    failureMessage: string;
}

export interface testCallBack {
    message: string;
    testPassed: string[];
    testFailed: string[];
}
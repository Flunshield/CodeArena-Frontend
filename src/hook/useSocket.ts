import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { MatchFoundEvent } from "../Interface/chatInterface";

const useSocket = (id: number, setMatchFound: (value: boolean) => void, setRoomId: (value: string | null) => void) => {
    const socket = useMemo(() => io(import.meta.env.VITE_API_BASE_URL_BACK), []);

    useEffect(() => {
        const handleMatchFound = ({ userId1, userId2, roomId }: MatchFoundEvent) => {
            if (userId1 === id || userId2 === id) {
                setMatchFound(true);
                setRoomId(roomId);
            }
        };

        socket.on('matchFound', handleMatchFound);

        return () => {
            socket.off('matchFound', handleMatchFound);
        };
    }, [id, socket, setMatchFound, setRoomId]);

    return socket;
};

export default useSocket;

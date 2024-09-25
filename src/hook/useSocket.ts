import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { MatchFoundEvent, Puzzle } from "../Interface/chatInterface";

const useSocket = (
    id: number,
    setMatchFound: (value: boolean) => void,
    setRoomId: (value: string | null) => void,
    setPuzzle?: (value: Puzzle | null) => void,
    setStartTimestamp?: (value: number | null) => void,
    setInQueue?: (value: boolean) => void
) => {
    const socket = useMemo(() => io(import.meta.env.VITE_API_BASE_URL_BACK), []);

    useEffect(() => {
        const handleMatchFound = ({ userId1, userId2, roomId, puzzle, startTimestamp }: MatchFoundEvent) => {
            if (userId1 === id || userId2 === id) {
                setMatchFound(true);
                setRoomId(roomId);
                if (setPuzzle) {
                    setPuzzle({
                        ...puzzle,
                    });
                }
                if (setStartTimestamp) {
                    setStartTimestamp(startTimestamp);
                }
            }
        };
        socket.on('matchFound', handleMatchFound);

        return () => {
            socket.off('matchFound', handleMatchFound);
            socket.disconnect(); // Ajout de la déconnexion propre
        };
    }, [id, socket, setMatchFound, setRoomId, setPuzzle, setStartTimestamp, setInQueue]);


    return socket;
};

export default useSocket;

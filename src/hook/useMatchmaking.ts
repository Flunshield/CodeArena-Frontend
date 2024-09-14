import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from "../AuthContext";
import { getElementByEndpoint, postElementByEndpoint, postTest } from "../Helpers/apiHelper";
import { JwtPayload } from "jwt-decode";
import { DataToken } from "../Interface/Interface";
import { Puzzle, testCallBack } from "../Interface/chatInterface";
import useUserInfos from "./useUserInfos.ts";
import { VITE_API_BASE_URL_BACK } from "../Helpers/apiHelper.ts";
import io, { Socket } from 'socket.io-client';

const useMatchmaking = () => {
    const authContext = useAuthContext();
    const tokenInfos = authContext?.infosUser as JwtPayload;
    const userInfos = useUserInfos();
    const infos = tokenInfos.aud as unknown as DataToken;
    const id = infos?.data?.id;
    const username = userInfos?.userName;

    const [loading, setLoading] = useState(true);
    const [inQueue, setInQueue] = useState(false);
    const [matchFound, setMatchFound] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
    const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
    const [matchEnded, setMatchEnded] = useState(false);
    const [testCallback, setTestCallback] = useState<testCallBack | null >(null);
    const [code, setCode] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(VITE_API_BASE_URL_BACK);
        setSocket(newSocket);
        const handleMatchEnded = ({
            success,
            roomId,
            userId,
            message,
        }: {
            success: boolean;
            roomId: string;
            userId: number;
            message: string;
        }) => {
            console.log('Match ended event received for room:', roomId, success, message, userId);
            setRoomId(null);
            setPuzzle(null);
            setStartTimestamp(null);
            setMatchFound(false);
            setInQueue(false);
            setTestCallback(null);
        };
        
        newSocket.on('endMatchByWinner', handleMatchEnded);

        return () => {
            newSocket.off('endMatchByWinner', handleMatchEnded);
            newSocket.disconnect();
        };
    }, [setRoomId, setPuzzle, setStartTimestamp, setMatchFound, setInQueue]);

    const refreshStatus = useCallback(async () => {
        if (id === undefined) {
            console.error("ID utilisateur est indéfini"); //TODO
            return;
        }

        setLoading(true);
        const checkRoom = await checkIsInRoom(authContext.accessToken ?? "", id);

        if (checkRoom.isInRoom) {
            setMatchFound(true);
            setRoomId(checkRoom.roomId);
            setPuzzle(checkRoom.puzzle);
            setStartTimestamp(checkRoom.startTimestamp);
        } else {
            const isInQueue = await checkIsInQueue(authContext.accessToken ?? "", id);
            setInQueue(isInQueue);
        }

        setLoading(false);
    }, [authContext.accessToken, id]);

    useEffect(() => {
        refreshStatus();
    }, [refreshStatus]);

    const handleJoinQueue = useCallback(async () => {
        if (id === undefined) {
            console.error("ID utilisateur est indéfini"); //TODO
            return;
        }

        const isInQueue = await checkIsInQueue(authContext.accessToken ?? "", id);

        if (isInQueue) {
            setInQueue(true);
            return;
        }

        const response = await postElementByEndpoint('matchmaking/joinQueue', {
            token: authContext.accessToken ?? '',
            data: { id }
        });

        const responseData = await response.json();
        if (responseData.success) {
            console.log("Ajouté à la file d'attente et recherche de match en cours"); //TODO
            setInQueue(true);
            setMatchEnded(false);
        } else {
            alert(responseData.message || "Erreur lors de la recherche de match");
        }
    }, [authContext.accessToken, id]);

    const handleLeaveQueue = useCallback(async () => {
        if (id === undefined) {
            console.error("ID utilisateur est indéfini"); //TODO
            return;
        }

        setLoading(true);
        const response = await postElementByEndpoint('matchmaking/leaveQueue', {
            token: authContext.accessToken ?? '',
            data: { id }
        });

        const responseData = await response.json();
        if (responseData.success) {
            resetMatchState();
        } else {
            alert(responseData.message || "Erreur lors de la sortie de la file d'attente");
        }
        setLoading(false);
    }, [authContext.accessToken, id]);

    const handleLeaveRoom = useCallback(async () => {
        if (id === undefined) {
            console.error("ID utilisateur est indéfini"); //TODO
            return;
        }

        setLoading(true);
        const response = await postElementByEndpoint('matchmaking/leaveRoom', {
            token: authContext.accessToken ?? '',
            data: { id }
        });

        const responseData = await response.json();
        if (responseData.success) {
            console.log("Quitter la salle de match"); //TODO
            resetMatchState();
        } else {
            alert(responseData.message || "Erreur lors de la sortie de la salle de match");
        }
        setLoading(false);
    }, [authContext.accessToken, id]);

    const handleEndMatch = useCallback(async () => {
        if (id === undefined || matchEnded) {
            console.error("ID utilisateur est indéfini ou le match est déjà terminé"); //TODO
            return;
        }

        setLoading(true);
        try {
            const response = await postElementByEndpoint('matchmaking/endMatchByTimer', {
                token: authContext.accessToken ?? '',
                data: { id }
            });

            if (response.ok) {
                console.log("Match terminé par timer."); //TODO
                resetMatchState();
                setMatchEnded(true);
            } else {
                console.error("Erreur lors de la fin du match."); //TODO
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API pour terminer le match:", error); //TODO
        }
        setLoading(false);
    }, [authContext.accessToken, id, matchEnded]);

    const resetMatchState = useCallback(() => {
        setRoomId(null);
        setPuzzle(null);
        setStartTimestamp(null);
        setMatchFound(false);
        setInQueue(false);
        setTestCallback(null);

    }, []);

    const handleSubmitCode = useCallback(async (code: string) => {
        if (!puzzle || !code) {
            alert("Code ou tests manquants !");
            console.log('puzzle: ', puzzle);
            console.log('code: ', code);
            return;
        }
    
        const payload = {
            code: code,
            tests: puzzle.tests
        };
    
        try {
            const response = await postTest('tests/js', payload);
            const responseData = await response.json();
    
            if (response.ok && responseData.success) {
                const successCallback: testCallBack = {
                    message: "Code et tests soumis avec succès !",
                    testPassed: responseData.testPassed || [],
                    testFailed: responseData.testFailed || [],
                };
                setTestCallback(successCallback);                
                
                socket?.emit('endMatchByWinner', {
                    roomId: roomId,
                    userId: id,
                });
                console.log('Emit endMatchByWinner sent:', { userId: id, roomId: roomId }); //TODO

            } else {
                const errorCallback: testCallBack = {
                    message: "Le code n'a pas passé tous les tests.",
                    testPassed: responseData.testPassed || [],
                    testFailed: responseData.testFailed || [],
                };
                setTestCallback(errorCallback);
            }
        } catch (error) {
            console.error("Erreur lors de la soumission du code et des tests:", error);
        }
    }, [puzzle, id, roomId, socket]);

    return {
        loading,
        inQueue,
        matchFound,
        roomId,
        id,
        username,
        puzzle,
        startTimestamp,
        code,
        testCallback,
        setCode,
        handleJoinQueue,
        handleLeaveQueue,
        handleLeaveRoom,
        handleEndMatch,
        handleSubmitCode,
        setMatchFound,
        setRoomId,
        setPuzzle,
        setInQueue,
        setStartTimestamp,
    };
}

export default useMatchmaking;


export async function checkIsInQueue(token: string, id: number) {
    try {
        const response = await getElementByEndpoint(`matchmaking/isInQueue?userId=` + id, {
            token,
            data: ''
        });

        if (response.status === 200) {
            const responseData = await response.json();
            if (responseData.success) {
                return responseData.isInQueue;
            } else {
                console.error('Erreur lors de la vérification de la file d\'attente : succès est faux'); //TODO
                return false;
            }
        } else {
            console.error('Erreur lors de la vérification de la file d\'attente du match'); //TODO
            return false;
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de la file d'attente :", error); //TODO
        return false;
    }
}

export async function checkIsInRoom(token: string, id: number) {
    try {
        const response = await getElementByEndpoint(`matchmaking/isInRoom?userId=` + id, {
            token,
            data: ''
        });

        if (response.status === 200) {
            const responseData = await response.json();
            if (responseData.success) {
                return {
                    isInRoom: responseData.isInRoom,
                    roomId: responseData.roomId,
                    puzzle: responseData.puzzle,
                    startTimestamp: responseData.startTimestamp
                };
            } else {
                console.error('Erreur lors de la vérification de la salle de match : succès est faux'); //TODO
                return { isInRoom: responseData.isInRoom, roomId: null };
            }
        } else {
            console.error('Erreur lors de la vérification de la salle de match'); //TODO
            return { isInRoom: false, roomId: null };
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la salle de match :', error); //TODO
        return { isInRoom: false, roomId: null };
    }
}
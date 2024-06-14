import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from "../AuthContext";
import { getElementByEndpoint, postElementByEndpoint } from "../Helpers/apiHelper";
import { JwtPayload } from "jwt-decode";
import { DataToken } from "../Interface/Interface";

const useMatchmaking = () => {
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const id = infos?.data?.id;
    const username = infos?.data?.userName;

    const [loading, setLoading] = useState(true);
    const [inQueue, setInQueue] = useState(false);
    const [matchFound, setMatchFound] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);

    useEffect(() => {
        if (id === undefined) {
            console.error("ID utilisateur est indéfini");
            return;
        }

        const refreshStatus = async () => {
            setLoading(true);
            
            const checkRoom = await checkIsInRoom(authContext.accessToken ?? "", id);
            if (checkRoom.isInRoom) {
                setMatchFound(true);
                setRoomId(checkRoom.roomId);
                console.log("isInRoom", checkRoom.isInRoom);
                console.log("roomId", checkRoom.roomId);
            } else {
                const isInQueue = await checkIsInQueue(authContext.accessToken ?? "", id);
                setInQueue(isInQueue);
            }
            setLoading(false);
        };

        refreshStatus();
    }, [authContext.accessToken, id]);

    const handleJoinQueue = useCallback(async () => {
        if (id === undefined) {
            console.error("ID utilisateur est indéfini");
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
            console.log("Ajouté à la file d'attente et recherche de match en cours");
            setInQueue(true);
        } else {
            alert(responseData.message || "Erreur lors de la recherche de match");
        }
    }, [authContext.accessToken, id]);

    const handleLeaveQueue = useCallback(async () => {
        if (id === undefined) {
            console.error("ID utilisateur est indéfini");
            return;
        }

        setLoading(true);
        const response = await postElementByEndpoint('matchmaking/leaveQueue', {
            token: authContext.accessToken ?? '',
            data: { id }
        });

        const responseData = await response.json();
        if (responseData.success) {
            console.log("Retiré de la file d'attente");
            setInQueue(false);
            setMatchFound(false);
            setRoomId(null);
        } else {
            alert(responseData.message || "Erreur lors de la sortie de la file d'attente");
        }
        setLoading(false);
    }, [authContext.accessToken, id]);

    const handleLeaveRoom = useCallback(async () => {
        if (id === undefined) {
            console.error("ID utilisateur est indéfini");
            return;
        }
        setLoading(true);
        const response = await postElementByEndpoint('matchmaking/leaveRoom', {
            token: authContext.accessToken ?? '',
            data: { id }
        });
        const responseData = await response.json();
        if (responseData.success) {
            console.log("Quitter la salle de match");
            setMatchFound(false);
            setRoomId(null);
            setInQueue(false);
        } else {
            alert(responseData.message || "Erreur lors de la sortie de la salle de match");
        }
        setLoading(false);
    }, [authContext.accessToken, id]);

    return {
        loading,
        inQueue,
        matchFound,
        roomId,
        id,
        username,
        handleJoinQueue,
        handleLeaveQueue,
        handleLeaveRoom,
        setMatchFound,
        setRoomId
    };
}

export default useMatchmaking;

async function checkIsInQueue(token: string, id: number) {
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
                console.error('Erreur lors de la vérification de la file d\'attente : succès est faux');
                return false;
            }
        } else {
            console.log('Erreur lors de la vérification de la file d\'attente du match');
            return false;
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de la file d'attente :", error);
        return false;
    }
}

async function checkIsInRoom(token: string, id: number) {
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
                    roomId: responseData.roomId
                };
            } else {
                console.error('Erreur lors de la vérification de la salle de match : succès est faux');
                return { isInRoom: responseData.isInRoom, roomId: null };
            }
        } else {
            console.log('Erreur lors de la vérification de la salle de match');
            return { isInRoom: false, roomId: null };
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la salle de match :', error);
        return { isInRoom: false, roomId: null };
    }
}
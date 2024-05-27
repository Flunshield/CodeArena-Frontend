import { useState, useEffect } from 'react';
import Button from '../ComposantsCommun/Button';
import useLoader from '../ComposantsCommun/LoaderMatch';
import Layout from "../ComposantsCommun/Layout";
import { useAuthContext } from "../AuthContext";
import { JwtPayload } from "jwt-decode";
import { DataToken } from "../Interface/Interface";
import { postElementByEndpoint, getElementByEndpoint } from "../Helpers/apiHelper";
import Chat from "../Composants/Chat/Chat";

function Ranked() {
    const authContext = useAuthContext();

    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const id = infos.data.id ?? null;

    const [loading, setLoading] = useState(true);
    const [inQueue, setInQueue] = useState(false);

    useEffect(() => {
        refreshQueueStatus();
    }, []);

    async function refreshQueueStatus() {
        setLoading(true);
        const isInQueue = await checkIsInQueue();
        setInQueue(isInQueue);
        setLoading(false);
    }

    async function checkIsInQueue() {
        try {
            const response = await getElementByEndpoint('matchmaking/getQueue', {
                token: authContext.accessToken ?? "",
                data: ''
            });

            if (response.status === 200) {
                const responseData = await response.json();
                const queue = responseData.queue as number[];
                if (typeof id === 'number' && !isNaN(id)) {
                    return queue.includes(id);
                } else {
                    console.error("L'ID utilisateur n'est pas valide");
                    return false;
                }
            } else {
                console.log("Erreur lors de la file d'attente du match");
                return false;
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de la file d'attente :", error);
            return false;
        }
    }

    async function handleJoinQueue() {
        const isInQueue = await checkIsInQueue();

        if (isInQueue) {
            setInQueue(true);
            return;
        }

        const response = await postElementByEndpoint('matchmaking/joinQueue', {
            token: authContext.accessToken ?? '',
            data: { id }
        });

        if (response.status === 201) {
            console.log("Ajouté à la file d'attente et recherche de match en cours");
            setInQueue(true);
        } else {
            alert("Erreur lors de la recherche de match");
        }
    }

    async function handleLeaveQueue() {
        setLoading(true);
        const response = await postElementByEndpoint('matchmaking/leaveQueue', {
            token: authContext.accessToken ?? '',
            data: { id }
        });

        if (response.status === 201) {
            console.log("Retiré de la file d'attente");
            setInQueue(false);
        } else {
            alert("Erreur lors de la sortie de la file d'attente");
        }
        setLoading(false);
    }

    return (
        <Layout>
            <Chat />
            <div className="m-2 text-white flex flex-col items-center py-[120px]">
                <div className='mb-4'>
                    {(loading || inQueue) && useLoader()}
                </div>
                {inQueue ? (
                    <Button id="ranked-button" type={'button'} className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1" onClick={handleLeaveQueue}>
                         Quitter la file d&apos;attente
                         <img src="/assets/exitIcon.svg" className="w-5 text-white" alt="quitter"/>
                    </Button>
                ) : (
                    <Button id="ranked-button" type={'button'} className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1" onClick={handleJoinQueue}>
                        Rechercher un match
                        <img src="/assets/arrowRightWhite.svg" className="w-5 text-white" alt="rejoindre" />
                    </Button>
                )}
            </div>
        </Layout>
    );
}

export default Ranked;

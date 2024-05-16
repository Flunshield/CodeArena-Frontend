import React, { useState, useEffect } from 'react';
import Button from '../ComposantsCommun/Button';
import useLoader from '../ComposantsCommun/LoaderMatch.tsx';
import Layout from "../ComposantsCommun/Layout.tsx";
import { useAuthContext } from "../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { DataToken } from "../Interface/Interface.ts";
import { postElementByEndpoint, getElementByEndpoint } from "../Helpers/apiHelper.ts";

function Ranked() {
    const authContext = useAuthContext();

    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const id = infos.data.id ?? null;

    const [loading, setLoading] = useState(true);
    const [loadingCheckQueue, setLoadingCheckQueue] = useState(true); // Nouvel état pour le chargement de la vérification de la file d'attente
    const [inQueue, setInQueue] = useState(false);

    useEffect(() => {
        refreshQueueStatus();
    }, []);

    async function refreshQueueStatus() {
        setLoadingCheckQueue(true); // Définir l'état de chargement pour la vérification de la file d'attente
        const isInQueue = await checkIsInQueue();
        setLoadingCheckQueue(false); // Définir l'état de chargement à false une fois que la vérification est terminée
        setInQueue(isInQueue);
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

        const response = await postElementByEndpoint(`matchmaking/joinQueue`, {
            token: authContext.accessToken ?? '',
            data: { id }
        });

        if (response.status === 201) {
            console.log("Ajouté à la file d'attente et recherche de match en cours");
            setInQueue(true);
        } else {
            alert("Erreur lors de la recherche de match");
        }
        setLoading(true);
    }

    async function handleLeaveQueue() {
        setLoading(true);
        const response = await postElementByEndpoint(`matchmaking/leaveQueue`, {
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
            <div className="m-2 text-white flex flex-col items-center py-[120px]">
                <div className='mb-4'>
                    {(loading || loadingCheckQueue) && useLoader()} {/* Utilisez loadingCheckQueue pour garder le loader affiché pendant la vérification de la file d'attente */}
                </div>
                {inQueue ? (
                    <Button id="ranked-button" type={'button'} className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1" onClick={handleLeaveQueue}>
                        <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                        </svg> Quitter la file d&apos;attente
                    </Button>
                ) : (
                    <Button id="ranked-button" type={'button'} className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1" onClick={handleJoinQueue}>
                        Rechercher un match
                        <img src="/assets/ArrowRightWhite.svg" className="w-5 text-white flex justify-end" alt="flèche" />
                    </Button>
                )}
            </div>
        </Layout>
    );
}

export default Ranked;

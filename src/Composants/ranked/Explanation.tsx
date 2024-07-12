
import { useTranslation } from 'react-i18next';
import Button from '../../ComposantsCommun/Button';
import LoaderMatch from '../../ComposantsCommun/LoaderMatch';
import useMatchmaking from '../../hook/useMatchmaking';
import useSocket from '../../hook/useSocket';
import { SectionIntro } from '../../ComposantsCommun/SectionIntro';
import { Container } from '../../ComposantsCommun/Container';
import { FadeIn, FadeInStagger } from '../../ComposantsCommun/FadeIn';
import Chat from '../Chat/Chat';


function Explanation() {
    const { t } = useTranslation();
    const {
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
    } = useMatchmaking();

    if (id !== undefined) {
        useSocket(id, setMatchFound, setRoomId);
    }

    const handleJoinQueueClick = () => {
        if (matchFound && roomId) {
            alert("Vous êtes déjà dans une salle de match !");
        } else {
            handleJoinQueue();
        }
    };

    return (
        <>
            {matchFound && roomId && id && username && (
                <Chat roomId={roomId} userId={id} username={username} />
            )}
            <SectionIntro
                title="Mode Classé"
            >
                <p>
                    Nous sommes heureux de vous accueillir dans le coeur de Code Arena

                    Si vous souhaitez tuer le temps ou poruver au autres que vous êtes le meilleur ?
                    <br />
                    Pas de soucis vous vous situez au bonne endroit !
                </p>
            </SectionIntro>
            <Container className="mt-16">
                <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    <FadeIn className="flex">
                        <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                            <h3>

                                <span className="absolute inset-0 rounded-3xl" />
                                Vous souhaitez jouer ?
                            </h3>
                            <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">

                            </p>
                        </article>
                    </FadeIn>
                    <FadeIn className="mt-10">
                        {(loading || (inQueue && !matchFound)) && (
                            <LoaderMatch msg={t(`Recherche d'un match en cours...`)} />
                        )}
                    </FadeIn>
                    <FadeInStagger className="mt-10">
                        <div className="flex flex-col items-center space-y-4">
                            {inQueue && !matchFound ? (
                                <Button
                                    id="ranked-button"
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                                    onClick={handleLeaveQueue}
                                >
                                    {'Quitter la file d\'attente'}
                                    <img src="/assets/exitIcon.svg" className="w-5 text-white" alt="quitter" />
                                </Button>
                            ) : (
                                !matchFound && (
                                    <Button
                                        id="ranked-button"
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                                        onClick={handleJoinQueueClick}
                                    >
                                        Rechercher un match
                                        <img src="/assets/arrowRightWhite.svg" className="w-5 text-white" alt="rejoindre" />
                                    </Button>
                                )
                            )}
                            {matchFound && (
                                <Button
                                    id="leave-room-button"
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                                    onClick={handleLeaveRoom}
                                >
                                    Quitter le match
                                    <img src="/assets/exitIcon.svg" className="w-5 text-white" alt="quitter" />
                                </Button>
                            )}
                        </div>
                    </FadeInStagger>

                </FadeInStagger>
            </Container>
        </>
    )
}

export default Explanation
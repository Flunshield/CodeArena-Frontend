import { useTranslation } from 'react-i18next';
import Layout from "../ComposantsCommun/Layout";
import AceEditor from "react-ace";
import Button from '../ComposantsCommun/Button';
import LoaderMatch from '../ComposantsCommun/LoaderMatch';
import Chat from "../Composants/Chat/Chat";
import useMatchmaking from '../hook/useMatchmaking';
import useSocket from '../hook/useSocket';

const Ranked = () => {
    const { t } = useTranslation();
    const {
        loading,
        inQueue,
        matchFound,
        roomId,
        id,
        username,
        puzzle,
        handleJoinQueue,
        handleLeaveQueue,
        handleLeaveRoom,
        setMatchFound,
        setRoomId,
        setPuzzle
    } = useMatchmaking();

    if (id !== undefined) {
        useSocket(id, setMatchFound, setRoomId, setPuzzle);
    }

    const handleJoinQueueClick = () => {
        if (matchFound && roomId) {
            alert("Vous êtes déjà dans une salle de match !");
        } else {
            handleJoinQueue();
        }
    };

    return (
        <Layout>
            {matchFound && roomId && id && username && (
                <div>
                    <div className='text-center bg'>
                        <h1>{puzzle?.title }</h1>
                        <p>{puzzle?.details}</p>
                    </div>
                    <div className='flex'>
                        <div className='w-full'>
                            <AceEditor
                                mode="javascript"
                                name="AceEditor"
                                editorProps={{ $blockScrolling: true }}
                                style={{ height: '500px', width: '100%' }}
                                className="border-2 border-white rounded-md"
                            />
                            <div className='flex justify-end p-2'>
                                <Button
                                    id="validate-button"
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-tertiari text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"

                                >
                                    {'Valider'}
                                    <img src="/assets/arrowRightWhite.svg" className="w-5 text-tertiari" alt="rejoindre" />
                                </Button>
                            </div>

                        </div>

                        <Chat roomId={roomId} userId={id} username={username} />
                    </div>
                </div>
            )}
            <div className="m-2 text-tertiari flex flex-col items-center pb-[120px]">
                <div className='mb-4'>
                    {(loading || (inQueue && !matchFound)) && <LoaderMatch msg={t(`Recherche d'un match en cours...`)} />}
                </div>
                {inQueue && !matchFound ? (
                    <Button
                        id="ranked-button"
                        type="button"
                        className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-tertiari text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                        onClick={handleLeaveQueue}
                    >
                        {'Quitter la file d\'attente'}
                        <img src="/assets/exitIcon.svg" className="w-5 text-tertiari" alt="quitter" />
                    </Button>
                ) : (
                    !matchFound && (
                        <Button
                            id="ranked-button"
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-tertiari text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                            onClick={handleJoinQueueClick}
                        >
                            Rechercher un match
                            <img src="/assets/arrowRightWhite.svg" className="w-5 text-tertiari" alt="rejoindre" />
                        </Button>
                    )
                )}
                {matchFound && (
                    <Button
                        id="leave-room-button"
                        type="button"
                        className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-tertiari text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                        onClick={handleLeaveRoom}
                    >
                        Quitter le match
                        <img src="/assets/exitIcon.svg" className="w-5 text-tertiari" alt="quitter" />
                    </Button>
                )}
            </div>
        </Layout>
    );
};

export default Ranked;
import { useTranslation } from 'react-i18next';
import Layout from "../ComposantsCommun/Layout";
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
        handleJoinQueue,
        handleLeaveQueue,
        setMatchFound,  
        setRoomId     
    } = useMatchmaking();
    
    if (id !== undefined) {
        useSocket(id, setMatchFound, setRoomId);
    }
    return (
        <Layout>
            {matchFound && roomId && id && username && (
                <Chat roomId={roomId} userId={id} username={username} />
            )}
            <div className="m-2 text-white flex flex-col items-center py-[120px]">
                <div className='mb-4'>
                    {(loading || (inQueue && !matchFound)) && <LoaderMatch msg={t('searchMatch')} />}
                </div>
                {inQueue && !matchFound ? (
                    <Button
                        id="ranked-button"
                        type="button"
                        className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                        onClick={handleLeaveQueue}
                    >
                        Quitter la file d&apos;attente
                        <img src="/assets/exitIcon.svg" className="w-5 text-white" alt="quitter" />
                    </Button>
                ) : (
                    !matchFound && (
                        <Button
                            id="ranked-button"
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                            onClick={handleJoinQueue}
                        >
                            Rechercher un match
                            <img src="/assets/arrowRightWhite.svg" className="w-5 text-white" alt="rejoindre" />
                        </Button>
                    )
                )}
            </div>
        </Layout>
    );
}

export default Ranked;

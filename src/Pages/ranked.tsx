import { useTranslation } from 'react-i18next';
import Layout from "../ComposantsCommun/Layout";
import AceEditor from "react-ace";
import Button from '../ComposantsCommun/Button';
import LoaderMatch from '../ComposantsCommun/LoaderMatch';
import Chat from "../Composants/Chat/Chat";
import useMatchmaking from '../hook/useMatchmaking';
import Notification from "../ComposantsCommun/Notification.tsx";
import useSocket from '../hook/useSocket';
import CountdownTimer from './countDownTimer';
import { useState } from 'react';

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
        startTimestamp,
        testCallback,
        showNotification,
        notificationType,
        notificationMessage,
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
        setShowNotification,
        setNotificationType,
        setNotificationMessage
    } = useMatchmaking();

    const [code, setCode] = useState("");

    if (id !== undefined) {
        useSocket(id, setMatchFound, setRoomId, setPuzzle, setStartTimestamp, setInQueue);
    }

    const handleJoinQueueClick = () => {
        if (matchFound && roomId) {
            setNotificationType('info');
            setNotificationMessage('Vous êtes déjà dans une salle de match !');
            setShowNotification(true);
        } else {
            handleJoinQueue();
        }
    };

    return (
        <Layout>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            {matchFound && roomId && id && username && (
                <div className='w-[95%] mx-auto'>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold font-sans text-gray-800 mb-2">{puzzle?.title}</h1>
                        <p className="text-lg text-gray-600">{puzzle?.details}</p>
                    </div>

                    <div className='flex gap-x-4'>
                        <div className='w-full'>
                            <AceEditor
                                mode="javascript"
                                name="AceEditor"
                                editorProps={{ $blockScrolling: true }}
                                style={{ height: '500px', width: '100%' }}
                                className="border-2 border-white rounded-md"
                                value={code} // Lier l'état 'code' à l'éditeur
                                onChange={(newCode) => setCode(newCode)} // Mettre à jour l'état quand l'utilisateur tape
                            />
                            <div className='flex justify-between py-2'>
                                <CountdownTimer
                                    key={startTimestamp}
                                    startTimestamp={startTimestamp || 0}
                                    onComplete={handleEndMatch}
                                />

                                <Button
                                    id="validate-button"
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-tertiari text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 gap-1"
                                    onClick={() => handleSubmitCode(code)}
                                >
                                    {'Valider'}
                                    <img src="/assets/arrowRightWhite.svg" className="w-5 text-tertiari" alt="rejoindre" />
                                </Button>
                            </div>

                        </div>

                        <Chat roomId={roomId} userId={id} username={username} />
                    </div>
                    {testCallback && (
                        <div className='mt-4 p-4 bg-tertiari rounded-lg'>
                            <p className='text-lg font-semibold text-gray-800 mb-3'>{testCallback.message}</p>
                            {testCallback.testPassed.length > 0 && (
                                <div className='mb-3'>
                                    <h4 className='text-green-700 font-medium'>Tests valides :</h4>
                                    <ul className='list-disc list-inside text-green-600'>
                                        {testCallback.testPassed.map((test, index) => (
                                            <li key={index}>{test}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {testCallback.testFailed.length > 0 && (
                                <div>
                                    <h4 className='text-red-700 font-medium'>Tests ratés :</h4>
                                    <ul className='list-disc list-inside text-red-600'>
                                        {testCallback.testFailed.map((test, index) => (
                                            <li key={index}>{test}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

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
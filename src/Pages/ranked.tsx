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
import Example from '../ComposantsCommun/Disclosure';
import { useState } from 'react';
import { AcademicCapIcon, TrophyIcon } from '@heroicons/react/20/solid'

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
        notificationDelay,
        nbGames,
        userRanking,
        userPoint,
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
        setNotificationMessage,
        fetchUserRanking
    } = useMatchmaking();

    const [code, setCode] = useState("");
    fetchUserRanking();

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
            <div className="block md:hidden">
                <div className="flex items-center justify-center h-screen text-center">
                    <p className="p-4 text-lg font-semibold text-red-600">
                        Les matchs ne sont pas accessibles sur mobile. Merci de vous connecter depuis un ordinateur ou une tablette pour continuer.
                    </p>
                </div>
            </div>
            <div className="hidden md:block">
                {showNotification && (
                    <Notification
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                        delay={notificationDelay}
                    />
                )}
                {matchFound && roomId && id && username && (
                    <div className="w-[95%] mx-auto">
                        <div className="text-center">
                            <h1 className="mb-2 font-sans text-3xl font-bold text-gray-800">
                                {puzzle?.title}
                            </h1>
                            <p className="text-lg text-gray-600">{puzzle?.details}</p>
                        </div>

                        <div className="flex gap-x-4">
                            <div className="w-full">
                                <AceEditor
                                    mode="javascript"
                                    name="AceEditor"
                                    editorProps={{ $blockScrolling: true }}
                                    style={{ height: "500px", width: "100%" }}
                                    className="border-2 border-white rounded-md"
                                    value={code}
                                    onChange={(newCode) => setCode(newCode)}
                                />
                                <div className="flex justify-between py-2">
                                    <CountdownTimer
                                        key={startTimestamp}
                                        startTimestamp={startTimestamp || 0}
                                        onComplete={handleEndMatch}
                                    />

                                    <Button
                                        id="validate-button"
                                        type="button"
                                        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium transition ease-in-out delay-75 bg-green-600 rounded-md hover:bg-green-700 text-tertiari hover:-translate-y-1 hover:scale-110"
                                        onClick={() => handleSubmitCode(code)}
                                    >
                                        Valider
                                        <img
                                            src="/assets/arrowRightWhite.svg"
                                            className="w-5 text-tertiari"
                                            alt="rejoindre"
                                        />
                                    </Button>
                                </div>
                            </div>

                            <Chat
                                roomId={roomId}
                                userId={id}
                                username={username}
                                setShowNotification={setShowNotification}
                                setNotificationMessage={setNotificationMessage}
                                setNotificationType={setNotificationType}
                            />
                        </div>

                        {testCallback && (
                            <div className="p-4 mt-4 rounded-lg bg-tertiari">
                                <p className="mb-3 text-lg font-semibold text-gray-800">
                                    {testCallback.message}
                                </p>
                                {testCallback.testPassed.length > 0 && (
                                    <div className="mb-3">
                                        <h4 className="font-medium text-green-700">Tests valides :</h4>
                                        <ul className="text-green-600 list-disc list-inside">
                                            {testCallback.testPassed.map((test, index) => (
                                                <li key={index}>{test}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {testCallback.testFailed.length > 0 && (
                                    <div>
                                        <h4 className="font-medium text-red-700">Tests ratés :</h4>
                                        <ul className="text-red-600 list-disc list-inside">
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
                    {!matchFound && (
                        <div className="flex justify-between w-full h-[200px]">
                            <div className="flex-1">
                                <Example />
                            </div>
                            <div className="flex items-center justify-around flex-1 text-center text-black rounded">
                                <div className="p-6 rounded bg-tertiari">
                                    <h2 className="text-lg font-semibold">Ma progression</h2>
                                    <div className="flex justify-center py-3">
                                        <AcademicCapIcon className="w-10" />
                                    </div>
                                    <p className="text-base">{nbGames}</p>
                                    <p className="text-base">Matchs joués</p>
                                </div>
                                <div className="p-6 rounded bg-tertiari">
                                    <h2 className="text-lg font-semibold">Mon classement</h2>
                                    <div className="flex justify-center py-3">
                                        <TrophyIcon className="w-10" />
                                    </div>
                                    <p className="text-base">{userRanking} </p>
                                    <p className="text-base">
                                        {userPoint ? userPoint + " points" : "0 point"}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        {(loading || (inQueue && !matchFound)) && (
                            <LoaderMatch msg={t(`Recherche d'un match en cours...`)} className="text-secondary" />
                        )}
                    </div>

                    {inQueue && !matchFound ? (
                        <Button
                            id="ranked-button"
                            type="button"
                            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium transition ease-in-out delay-75 bg-red-600 rounded-md hover:bg-red-700 text-tertiari hover:-translate-y-1 hover:scale-110"
                            onClick={handleLeaveQueue}
                        >
                            Quitter la file d&apos;attente
                            <img
                                src="/assets/exitIcon.svg"
                                className="w-5 text-tertiari"
                                alt="quitter"
                            />
                        </Button>
                    ) : (
                        !matchFound && (
                            <Button
                                id="ranked-button"
                                type="button"
                                className="inline-flex items-center gap-1 px-4 py-2 mt-[150px] text-sm font-medium transition ease-in-out delay-75 bg-green-600 rounded-md hover:bg-green-700 text-tertiari hover:-translate-y-1 hover:scale-110"
                                onClick={handleJoinQueueClick}
                            >
                                Rechercher un match
                                <img
                                    src="/assets/arrowRightWhite.svg"
                                    className="w-5 text-tertiari"
                                    alt="rejoindre"
                                />
                            </Button>
                        )
                    )}

                    {matchFound && (
                        <Button
                            id="leave-room-button"
                            type="button"
                            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium transition ease-in-out delay-75 bg-red-600 rounded-md hover:bg-red-700 text-tertiari hover:-translate-y-1 hover:scale-110"
                            onClick={handleLeaveRoom}
                        >
                            Quitter le match
                            <img
                                src="/assets/exitIcon.svg"
                                className="w-5 text-tertiari"
                                alt="quitter"
                            />
                        </Button>
                    )}
                </div>
            </div>
        </Layout>

    );
};

export default Ranked;
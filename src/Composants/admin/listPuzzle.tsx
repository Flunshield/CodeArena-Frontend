import {Puzzle, Ranking} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {deletePuzzle, getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../AuthContext.tsx";
import Notification from "../../ComposantsCommun/Notification.tsx";
import PuzzleFormAdmin from "./puzzleFormAdmin.tsx";
import Card from "../../ComposantsCommun/Card.tsx";
import Pagination from "../../ComposantsCommun/Pagination.tsx";

interface listPuzzleProps {
    className?: string;
    setIsSubmitted: () => void;
    submitCount: number;
    ranks: Ranking[];
}

const ListPuzzle = ({className, submitCount, setIsSubmitted, ranks}: listPuzzleProps) => {

    const {t} = useTranslation();
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? "";
    const [puzzles, setPuzzles] = useState<{ items: Puzzle[], count: number }>({items: [], count: 0});
    const [puzzleToPopup, setPuzzleToPopup] = useState<Puzzle>({
        tests: [],
        description: "",
        details: "",
        id: 0,
        title: "",
        rankings: ranks[0],
        events: undefined
    });
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const getPuzzle = getElementByEndpoint("admin/getPuzzles?currentPage=" + currentPage, {token: token, data: ""});

    const maxPage = Math.ceil(puzzles.count / 10);

    function onEdit(puzzle: Puzzle) {
        setPopupOpen(true);
        setPuzzleToPopup(puzzle);
    }

    async function onDelete(id: number) {
        const isDelete = await deletePuzzle("admin/deletePuzzle", {token, puzzleId: id});
        if (isDelete.status === 200) {
            setIsSubmitted();
        } else {
            setNotificationMessage(t('updateError'));
            setNotificationType('error');
            setShowNotification(true);
        }
    }

    const closePopup = () => {
        setPopupOpen(false);
    };

    useEffect(() => {
        getPuzzle.then(async (response) => {
            const result = await response.json();
            setPuzzles(result);
        });
    }, [submitCount]);

    return (
        <div>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className={clsx(className, "overflow-x-auto rounded-xl m-5")}>
                <h2 className="text-lg font-semibold text-tertiari mb-4">{t('listPuzzle')}</h2>
                <table className="min-w-full table-auto text-secondary">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">{t('title')}</th>
                        <th className="px-4 py-2 border">{t('ranking')}</th>
                        <th className="px-4 py-2 border">{t('event')}</th>
                        <th className="px-4 py-2 border">{t('modify')}</th>
                        <th className="px-4 py-2 border">{t('delete')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {puzzles && puzzles.items.map((puzzle) => (
                        <tr key={puzzle.id} className="bg-white even:bg-gray-100">
                            <td className="px-4 py-2 border text-center">{puzzle.id}</td>
                            <td className="px-4 py-2 border text-center">{puzzle.title}</td>
                            <td className="px-4 py-2 border text-center">{puzzle.rankings?.title ?? 'N/A'}</td>
                            <td className="px-4 py-2 border text-center">{puzzle.events?.title ?? 'N/A'}</td>
                            <td className="px-4 py-2 border text-center align-middle">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => onEdit(puzzle)}
                                >
                                    Modifier
                                </button>
                            </td>
                            <td className="px-4 py-2 border text-center align-middle">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => onDelete(puzzle.id)}
                                >
                                    {t('delete')}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    item={puzzles.items}
                    maxPage={maxPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setSubmitCount={setIsSubmitted}
                    classNameCurrentPage="text-primary"
                    itemPerPage={10}
                />
            </div>
            {popupOpen && (
                <div
                    className={clsx("fixed top-0 left-0 w-full h-full flex flex-col bg-black items-center justify-center md:bg-opacity-75 z-50")}>
                    <Card className="w-2/3 lg:w-1/3 p-5 bg-tertiari text-secondary">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold text-gray-700">{t('titlePuzzle')}</h2>
                            <button
                                onClick={closePopup}
                                className="rounded-full bg-error hover:bg-tertiary-light text-tertiari font-semibold py-2 px-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                X
                            </button>
                        </div>
                        <PuzzleFormAdmin initialValues={puzzleToPopup} ranks={ranks} setPopupOpen={setPopupOpen}
                                         setIsSubmitted={setIsSubmitted}/>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default ListPuzzle;

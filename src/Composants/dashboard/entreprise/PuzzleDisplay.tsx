import {DataToken, listPuzzleEntreprise, Pricing, PuzzlesEntreprise} from "../../../Interface/Interface.ts";
import Button from "../../../ComposantsCommun/Button.tsx";
import {deletePuzzle, getElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import PuzzleForm from "../../../ComposantsCommun/PuzzleForm.tsx";
import {useEffect, useState} from "react";
import SendPuzzle from "./SendPuzzle.tsx";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../../AuthContext.tsx";
import Notification from "../../../ComposantsCommun/Notification.tsx";
import {JwtPayload} from "jwt-decode";
import Pagination from "../../../ComposantsCommun/Pagination.tsx";

interface PuzzleDisplayProps {
    setIsSubmitted: () => void;
    submitCount: number;
    setPuzzleToPopup?: (value: PuzzlesEntreprise | undefined) => void;
    puzzleToPopup?: PuzzlesEntreprise;
    lastCommande?: Pricing;
    nbPuzzleCreated: number;
    setSubmitCount: (value: (count: number) => number) => void;
}

const PuzzleDisplay = (
    {
        setIsSubmitted,
        submitCount,
        setPuzzleToPopup,
        puzzleToPopup,
        lastCommande,
        nbPuzzleCreated,
        setSubmitCount
    }: PuzzleDisplayProps) => {
    const [isPopupOpenModify, setPopupOpenModify] = useState(false);
    const [isPopupOpenSend, setPopupOpenSend] = useState(false);
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const [tabPuzzlesEntreprise, setTabPuzzlesEntreprise] = useState<listPuzzleEntreprise>({item: [], total: 0});
    const itemPerPage = 4;
    const maxPage = tabPuzzlesEntreprise.item.length > 0 ? Math.ceil(tabPuzzlesEntreprise.total / itemPerPage) : 1;


    /**
     * Effectue une requête asynchrone pour récupérer les données d'un puzzle spécifique via un endpoint API.
     * Utilise un identifiant de puzzle extrait d'un objet `infos` pour construire l'URL de la requête.
     *
     * @returns Promise qui résout les données du puzzle ou rejette une erreur en cas d'échec de la requête.
     */
    const fetchData = async () => {
        return await getElementByEndpoint(`puzzle/findPuzzles?id=${infos?.data.id}&page=${currentPage}`, {
            token: authContext?.accessToken ?? "",
            data: ""
        });
    };
    /**
     * Gère de manière asynchrone la suppression d'un puzzle en effectuant un appel API.
     * Met à jour le compteur de soumissions si la suppression réussit.
     *
     * Si aucun identifiant n'est fourni, la fonction tentera tout de même de supprimer un puzzle,
     * mais peut échouer si l'API requiert un identifiant.
     * @param puzzleId
     */
    const handleClickDelete = async (puzzleId?: number) => {
        await deletePuzzle('puzzle/deletePuzzle', {
            token: authContext?.accessToken ?? "",
            puzzleId: puzzleId
        }).then(response => {
            if (response.ok) {
                setNotificationMessage(t('puzzleDeleted'));
                setNotificationType('success');
                setShowNotification(true);
                    setIsSubmitted();
            } else {
                setNotificationMessage(t('failedDeletePuzzle'));
                setNotificationType('error');
                setShowNotification(true);
            }
        }).catch(error => {
            setNotificationMessage(`${t('failedDeletePuzzle')} ${error}`);
            setNotificationType('error');
            setShowNotification(true);
        });
    };

    const openPopup = (puzzle?: PuzzlesEntreprise, type?: string) => {
        document.body.style.overflow = "hidden";
        // TYPE 1 = MODIFIER
        if (type === "1") {
            setPopupOpenModify(true);
            if (setPuzzleToPopup) {
                setPuzzleToPopup(puzzle);
            }
        }
        // TYPE 2 = ENVOYER
        if (type === "2") {
            setPopupOpenSend(true);
            if (setPuzzleToPopup) {
                setPuzzleToPopup(puzzle);
            }
        }
    };

    const closePopup = async () => {
        document.body.style.overflow = "auto";
        setPopupOpenModify(false);
        setPopupOpenSend(false);
    };

    useEffect(() => {
        if (authContext?.connected) {
            fetchData().then(async (response) => {
                if (response.status === 200) {
                    setTabPuzzlesEntreprise(await response.json());
                }
            });
        }
    }, [currentPage, submitCount]);

    return (
        <div id="PuzzleDisplay" className={clsx(tabPuzzlesEntreprise?.item.length == 0 ? "hidden" : "m-5")}>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="bg-tertiari shadow-xl overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-quaternary mb-5">{t("puzzleCreated")}</h3>
                    <div className="overflow-hidden rounded-lg shadow-lg"> {/* Conteneur avec arrondis */}
                        <table className="min-w-full mt-3 text-sm text-quaternary table-auto rounded-lg">
                            <thead className="bg-tertiari">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider">{t("title")}</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider">{t("actions")}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tabPuzzlesEntreprise?.item.map((puzzle: PuzzlesEntreprise) => (
                                <tr key={puzzle.id}
                                    className="bg-tertiari p-5 m-2 w-auto overflow-hidden rounded-lg shadow">
                                    <td className="px-6 py-4 whitespace-nowrap text-xl text-center font-bold uppercase text-secondary break-words">
                                        {puzzle.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center items-center">
                                            <Button type="button" onClick={() => openPopup(puzzle, "1")}
                                                    className="bg-petroleum-blue hover:shadow-md hover:shadow-light-blue text-tertiari font-bold py-2 px-4 rounded"
                                                    id="updateTitle">{t("modify")}
                                            </Button>
                                            <Button type="button" onClick={() => openPopup(puzzle, "2")}
                                                    className="bg-olive-green hover:shadow-lg hover:shadow-olive-green text-tertiari font-bold py-2 px-4 rounded"
                                                    id="deleteTitle">{t("sendPuzzle")}
                                            </Button>
                                            <Button type="button" onClick={() => handleClickDelete(puzzle.id)}
                                                    className="bg-[#D63864] hover:shadow-lg hover:shadow-rose-300 text-tertiari font-bold py-2 px-4 rounded"
                                                    id="deleteTitle">{t("delete")}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        item={tabPuzzlesEntreprise?.item}
                        maxPage={maxPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setSubmitCount={setSubmitCount}
                        classNameCurrentPage="text-primary"
                        itemPerPage={itemPerPage}
                    />
                </div>
            </div>

            {isPopupOpenModify && (
                <div
                    className="fixed top-0 left-0 w-full h-full overflow-auto flex items-center justify-center bg-black bg-opacity-100 md:bg-opacity-75 z-50">
                    <PuzzleForm className="w-full max-w-4xl mx-auto m-auto p-4 rounded-lg shadow"
                                title={puzzleToPopup?.title} details={puzzleToPopup?.details}
                                tests={puzzleToPopup?.tests}
                                time={puzzleToPopup?.time}
                                id={puzzleToPopup?.id?.toString()}
                                closePopup={closePopup} setIsSubmitted={() => setIsSubmitted()}
                                lastCommande={lastCommande} nbPuzzleCreated={nbPuzzleCreated}/>
                </div>
            )}
            {isPopupOpenSend && (
                <div
                    className={clsx("fixed top-0 pt-10 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-100 md:bg-opacity-75 z-50")}>
                    <SendPuzzle className="flex flex-col w-full m-10 h-full overflow-scroll sm:overflow-auto"
                                closePopup={closePopup} puzzleToPopup={puzzleToPopup}/>
                </div>
            )}
        </div>
    )
}

export default PuzzleDisplay;
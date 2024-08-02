import {SetStateAction, useEffect, useState} from 'react';
import {formatSeconds} from '../../../Helpers/formatHelper.ts';
import {listPuzzleSend, PuzzleSend, User} from '../../../Interface/Interface.ts';
import CodeBlock from "../../../ComposantsCommun/CodeBlock.tsx";
import Button from "../../../ComposantsCommun/Button.tsx";
import {deletePuzzle, getElementByEndpoint, postElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Notification from "../../../ComposantsCommun/Notification.tsx";
import Pagination from "../../../ComposantsCommun/Pagination.tsx";
import {ITEMS_PER_PAGE_QUATRE} from "../../../constantes/constantes.ts";
import Poubelle from "../../../../public/assets/icones/bean.png";

interface PuzzleListProps {
    setIsSubmitted: () => void;
    submitCount: number;
    infosUserById?: User;
}

const PuzzleList = ({
                        setIsSubmitted, submitCount, infosUserById
                    }: PuzzleListProps) => {
    const {t} = useTranslation();
    const [sortKey, setSortKey] = useState<string>('sendDate');
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const authContext = useAuthContext();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const [puzzleFinish, setPuzzleFinish] = useState<listPuzzleSend>({item: [], total: 0});
    const maxPage = puzzleFinish.item.length > 0 ? Math.ceil(puzzleFinish.total / ITEMS_PER_PAGE_QUATRE) : 1;

    const getPuzzle = getElementByEndpoint(`entreprise/getPuzzlePlaying?id=${infosUserById?.id}&page=${currentPage}`, {
        token: authContext.accessToken ?? "",
        data: ''
    });

    const handleSort = (key: SetStateAction<string>) => {
        if (sortKey === key) {
            setIsAscending(!isAscending);
        } else {
            setSortKey(key);
            setIsAscending(true);
        }
    };

    // Créer une liste unique de titres pour le sélecteur
    const titles = Array.from(new Set(puzzleFinish?.item?.map(item => item.puzzlesEntreprise.title)));

    // Filtrer et trier les données
    const filteredData = selectedTitle
        ? puzzleFinish.item.filter(item => item.puzzlesEntreprise.title === selectedTitle)
        : puzzleFinish.item;

    const sortedData = filteredData.sort((a, b) => {
        if (sortKey === 'sendDate') {
            return isAscending ?
                (new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime()) :
                (new Date(b.sendDate).getTime() - new Date(a.sendDate).getTime());
        } else {
            const valueA = a[sortKey as keyof PuzzleSend];
            const valueB = b[sortKey as keyof PuzzleSend];
            if (valueA && valueB) {
                if (valueA < valueB) {
                    return isAscending ? -1 : 1;
                } else if (valueA > valueB) {
                    return isAscending ? 1 : -1;
                }
            }
        }
        return 0;
    });

    const deleteOnePuzzle = async (puzzleId: number) => {
        const result = await deletePuzzle("puzzle/deletePuzzleSend", {
            token: authContext?.accessToken ?? "",
            puzzleId: puzzleId
        });
        if (result.status === 200) {
            setNotificationMessage(t('puzzleDeleted'));
            setNotificationType('success');
            setShowNotification(true);
            setTimeout(() => {
                setIsSubmitted();
            }, 2000);
        } else {
            setNotificationMessage(t('failedDeletePuzzle'));
            setNotificationType('error');
            setShowNotification(true);
        }
    }
    const deleteOldPuzzlePuzzle = async () => {
        const result = await deletePuzzle("puzzle/deletePuzzleSend", {
            token: authContext?.accessToken ?? "",
            puzzleId: "old"
        });
        if (result.status === 200) {
            setNotificationMessage(t('puzzleDeleted'));
            setNotificationType('success');
            setShowNotification(true);
            setTimeout(() => {
                setIsSubmitted();
            }, 2000);
        } else {
            setNotificationMessage(t('failedDeletePuzzle'));
            setNotificationType('error');
            setShowNotification(true);
        }
    }

    const validatePuzzle = async (puzzleId: number) => {
        const result = await postElementByEndpoint("puzzle/validatePuzzleSend", {
            token: authContext?.accessToken ?? "",
            data: {
                puzzleId: puzzleId
            }
        });
        if (result.status === 201) {
            setTimeout(() => {
                setIsSubmitted();
                setNotificationMessage(t('actionSuccess'));
                setNotificationType('success');
                setShowNotification(true);
            }, 500);
        } else {
            setNotificationMessage(t('actionError'));
            setNotificationType('error');
            setShowNotification(true);
        }
    }

    useEffect(() => {
        if (authContext?.connected) {
            getPuzzle.then(async (response) => {
                const result = await response.json();
                setPuzzleFinish(result);
            });
        }
    }, [currentPage, submitCount, authContext?.connected]);
    return (
        <div id="PuzzleList"
             className={clsx(puzzleFinish.total == 0 ? "hidden" : "", "m-5 rounded-lg bg-tertiari shadow-xl p-6")}>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <h1 className="text-center font-bold text-3xl">{t("puzzleRealized")}</h1>
            <div className="flex justify-end max-sm:flex-col space-x-2 max-sm:space-y-1 mb-4 mt-5">
                <select
                    className="px-4 py-2 w-40 h-10 rounded bg-petroleum-blue text-tertiari cursor-pointer"
                    value={selectedTitle}
                    onChange={e => setSelectedTitle(e.target.value)}
                >
                    <option value="">Tous les titres</option>
                    {titles.map((title, index) => (
                        <option key={index} value={title}>
                            {title}
                        </option>
                    ))}
                </select>
                <button className="px-4 py-2 w-32 h-10 overflow-hidden rounded bg-petroleum-blue text-tertiari"
                        onClick={() => handleSort('sendDate')}>{t("triDate")}
                </button>
                <Button type={"submit"} id={"delete"}
                        className={"px-4 py-2 w-32 h-10 rounded bg-[#D63864] text-tertiari font-bold"}
                        onClick={() => deleteOldPuzzlePuzzle()}>X ({'>'} 1 {t("month")})</Button>
            </div>
            {sortedData.map(result => (
                <div key={result.id} className="rounded-lg p-4 mb-4 border border-gray-300 bg-tertiari">
                    <div className="flex flex-row-reverse justify-between w-full">
                        <div className="flex flex-row">
                            <Button type={"button"} id={"validate-" + result.id.toString()}
                                    className={clsx(result.verified ? "bg-olive-green" : "bg-gris-chaud", "px-4 py-2 rounded  text-tertiari font-bold mr-2")}
                                   onClick={() => validatePuzzle(result.id)}>V</Button>
                            <Button type={"button"} id={"delete-" + result.id.toString()}
                                    className={"px-4 py-2 rounded bg-error text-tertiari font-bold"}
                                    onClick={() => deleteOnePuzzle(result.id)}><img src={Poubelle} alt="bean" className="w-4 h-5"/></Button>
                        </div>
                        <h1 className="flex-1 text-center text-xl font-bold">{result.puzzlesEntreprise.title}</h1>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">{result.firstName} {result.lastName}</h2>
                    <p className="text-gray-600">
                        <strong>{t("sendAt")}</strong> {new Date(result.sendDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <strong>{t("email")} :</strong> {result.email}
                    </p>
                    <p className="text-gray-600">
                        <strong>{t("commentary")} :</strong> {result.commentaire !== "" ? result.commentaire : t("notCommentary")}
                    </p>
                    <p className="text-gray-600">
                        <strong>{t("nbTestPassing")} : </strong>
                        <span
                            className="text-blue-500">{result.testValidated} / {result.puzzlesEntreprise.tests?.length}</span>
                    </p>
                    <p className="text-gray-600">
                        <strong>{t("realizedIn")} : </strong>
                        <span
                            className="text-blue-500">{result.time && formatSeconds(parseInt(result.time))}</span>
                    </p>
                    <div>
                        <h3 className="font-semibold text-gray-800">{t("codeSend")} :</h3>
                        <CodeBlock code={result.result || t("anyCodeDisplay")}/>
                    </div>
                </div>
            ))}
            <Pagination item={puzzleFinish?.item} maxPage={maxPage} currentPage={currentPage}
                        setCurrentPage={setCurrentPage} setSubmitCount={setIsSubmitted} itemPerPage={3}/>
        </div>

    );
};

export default PuzzleList;

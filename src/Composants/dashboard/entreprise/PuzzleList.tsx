import {useEffect, useState} from 'react';
import {formatSeconds} from '../../../Helpers/formatHelper.ts';
import {listPuzzleSend, User} from '../../../Interface/Interface.ts';
import CodeBlock from "../../../ComposantsCommun/CodeBlock.tsx";
import Button from "../../../ComposantsCommun/Button.tsx";
import {deletePuzzle, getElementByEndpoint, postElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Notification from "../../../ComposantsCommun/Notification.tsx";
import Pagination from "../../../ComposantsCommun/Pagination.tsx";
import {ITEMS_PER_PAGE_TROIS} from "../../../constantes/constantes.ts";
import Poubelle from "/assets/icones/bean.png";

interface PuzzleListProps {
    setIsSubmitted: () => void;
    submitCount: number;
    infosUserById?: User;
}

const PuzzleList = ({
                        setIsSubmitted, submitCount, infosUserById
                    }: PuzzleListProps) => {
    const {t} = useTranslation();
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const authContext = useAuthContext();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [puzzleCheck, setPuzzleCheck] = useState<boolean | undefined>(undefined);
    const [puzzleVerifiedEtat, setPuzzleVerifiedEtat] = useState<number>(1);
    const [colorButtonVerified, setColorButtonVerified] = useState<string>('bg-petroleum-blue');

    const [puzzleFinish, setPuzzleFinish] = useState<listPuzzleSend>({item: [], total: 0, titles: [{title: ""}]});
    const maxPage = puzzleFinish.item.length > 0 ? Math.ceil(puzzleFinish.total / ITEMS_PER_PAGE_TROIS) : 1;

    const getPuzzle = async () => {
        const response = await getElementByEndpoint(`entreprise/getPuzzlePlaying?id=${infosUserById?.id}&page=${currentPage}&title=${selectedTitle}&ascending=${isAscending}&puzzleCheck=${puzzleCheck}`, {
            token: authContext.accessToken ?? "",
            data: ''
        });
        const result = await response.json();
        if(result.total === 0) {
            result.total = result.item.length;
            setPuzzleVerifiedEtat(1);
            handlePuzzleCheck();
        }
        setPuzzleFinish(result);
    };

    const handleSort = () => {
        setIsAscending(!isAscending);
        setCurrentPage(1);
    };

    const handlePuzzleCheck = () => {
        if (puzzleVerifiedEtat === 0) {
            setPuzzleVerifiedEtat(1);
            setPuzzleCheck(true);
            setColorButtonVerified('bg-olive-green');
        } else if (puzzleVerifiedEtat === 1) {
            setPuzzleVerifiedEtat(2);
            setPuzzleCheck(false);
            setColorButtonVerified('bg-gris-chaud');
        } else if (puzzleVerifiedEtat === 2) {
            setPuzzleVerifiedEtat(0);
            setPuzzleCheck(undefined);
            setColorButtonVerified('bg-petroleum-blue');
        }

        setCurrentPage(1);
    }
    const selectTitle = (title: string) => {
        setSelectedTitle(title);
        setCurrentPage(1);
    }

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
    };

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
    };

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
    };

    useEffect(() => {
        if (authContext?.connected) {
            getPuzzle().then(r => r);
        }
    }, [currentPage, submitCount, selectedTitle, isAscending, puzzleCheck, authContext?.connected]);

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
            <div className="flex justify-end max-sm:flex-col space-x-2 max-sm:space-x-0 max-sm:space-y-2 mb-4 mt-5">
                <select
                    className="px-4 py-2 w-40 rounded bg-petroleum-blue text-tertiari cursor-pointer"
                    value={selectedTitle}
                    onChange={e => selectTitle(e.target.value)}
                >
                    <option value="">{t('allTitles')}</option>
                    {puzzleFinish.titles.map((item, index) => (
                        <option key={index} value={item.title}>
                            {item.title}
                        </option>
                    ))}
                </select>
                <button className="px-4 py-2 w-32 rounded bg-petroleum-blue text-tertiari"
                        onClick={() => handleSort()}>{t("triDate")}</button>
                <button className={clsx(colorButtonVerified, "px-4 py-2 w-32 rounded text-tertiari")}
                        onClick={() => handlePuzzleCheck()}>{t("statusOfVerification")}</button>
                <Button type="submit" id="delete"
                        className="px-4 py-2 w-32 rounded bg-[#D63864] text-tertiari font-bold"
                        onClick={() => deleteOldPuzzlePuzzle()}>X ({'>'} 1 {t("month")})</Button>
            </div>
            {puzzleFinish.item.map(result => (
                <div key={result.id} className="rounded-lg p-4 mb-4 border border-gray-300 bg-tertiari">
                    <div className="flex max-md:flex-col justify-between w-full">
                        <h1 className="flex-1 text-center text-xl font-bold">{result.puzzlesEntreprise.title}</h1>
                        <div className="flex flex-row max-md:justify-center max-md:m-5">
                            <Button type="button" id={"validate-" + result.id.toString()}
                                    className={clsx(result.verified ? "bg-olive-green" : "bg-gris-chaud", "px-4 py-2 w-32 rounded text-tertiari font-bold mr-2")}
                                    onClick={() => validatePuzzle(result.id)}>V</Button>
                            <Button type="button" id={"delete-" + result.id.toString()}
                                    className="px-4 py-2 w-32 rounded bg-error text-tertiari font-bold"
                                    onClick={() => deleteOnePuzzle(result.id)}>
                                <img src={Poubelle} alt="bean" className="w-4 h-5"/>
                            </Button>
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">{result.firstName} {result.lastName}</h2>
                    <p className="text-gray-600">
                        <strong>{t("sendAt")}</strong> {new Date(result.sendDate).toLocaleDateString()}</p>
                    <p className="text-gray-600"><strong>{t("email")} :</strong> {result.email}</p>
                    <p className="text-gray-600">
                        <strong>{t("commentary")} :</strong> {result.commentaire !== "" ? result.commentaire : t("notCommentary")}
                    </p>
                    <p className="text-gray-600"><strong>{t("nbTestPassing")} : </strong><span
                        className="text-blue-500">{result.testValidated} / {result.puzzlesEntreprise.tests?.length}</span>
                    </p>
                    <p className="text-gray-600"><strong>{t("realizedIn")} : </strong><span
                        className="text-blue-500">{result.time && formatSeconds(parseInt(result.time))}</span></p>
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

import {SetStateAction, useEffect, useState} from 'react';
import {formatSeconds} from '../../../Helpers/formatHelper.ts';
import {DataToken, PuzzleSend} from '../../../Interface/Interface.ts';
import CodeBlock from "../../../ComposantsCommun/CodeBlock.tsx";
import Button from "../../../ComposantsCommun/Button.tsx";
import {deletePuzzle, getElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {useTranslation} from "react-i18next";

interface PuzzleListProps {
    setIsSubmitted: () => void;
    submitCount: number;
}

const PuzzleList = ({
                        setIsSubmitted, submitCount,
                    }: PuzzleListProps) => {
    const {t} = useTranslation();
    const [sortKey, setSortKey] = useState<string>('sendDate');
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;

    const [puzzleFinish, setPuzzleFinish] = useState<PuzzleSend[]>([]);

    const handleSort = (key: SetStateAction<string>) => {
        if (sortKey === key) {
            setIsAscending(!isAscending);
        } else {
            setSortKey(key);
            setIsAscending(true);
        }
    };

    // Créer une liste unique de titres pour le sélecteur
    const titles = Array.from(new Set(puzzleFinish.map(item => item.puzzlesEntreprise.title)));

    // Filtrer et trier les données
    const filteredData = selectedTitle
        ? puzzleFinish.filter(item => item.puzzlesEntreprise.title === selectedTitle)
        : puzzleFinish;

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

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    };

    const deleteOnePuzzle = async (id: number) => {
        const result = await deletePuzzle("puzzle/deletePuzzleSend", {
            token: authContext?.accessToken ?? "",
            puzzleId: id
        });
        if (result.status === 200) {
            setIsSubmitted();
        }
    }
    const deleteOldPuzzlePuzzle = async () => {
        const result = await deletePuzzle("puzzle/deletePuzzleSend", {
            token: authContext?.accessToken ?? "",
            puzzleId: "old"
        });
        if (result.status === 200) {
            setIsSubmitted();
        }
    }

    useEffect(() => {
        if (authContext?.connected) {
            getElementByEndpoint(`entreprise/getPuzzlePlaying?id=${infos?.data.id}&page=${currentPage}`, {
                token: authContext.accessToken ?? "",
                data: ''
            }).then(async (response) => {
                const result = await response.json();
                setPuzzleFinish(result);
            });
        }
    }, [currentPage, submitCount, authContext?.connected]);

    return (
        <div className="m-5 rounded-lg bg-tertiari shadow-xl p-6">
            <h1 className="text-center font-bold text-3xl">{t("puzzleRealized")}</h1>
            <div className="flex justify-end space-x-2 mb-4">
                <select
                    className="px-4 py-2 rounded bg-petroleum-blue text-white cursor-pointer"
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
                <button className="px-4 py-2 rounded bg-petroleum-blue text-white"
                        onClick={() => handleSort('sendDate')}>{t("triDate")}
                </button>
                <Button type={"submit"} id={"delete"}
                        className={"px-4 py-2 rounded bg-red text-white font-bold"}
                        onClick={() => deleteOldPuzzlePuzzle()}>X ({'>'} 1 {t("month")})</Button>
            </div>
            {sortedData.map(result => (
                <div key={result.id} className="rounded-lg p-4 mb-4 border border-gray-300 bg-white">
                    <div className="flex flex-row-reverse justify-between w-full">
                        <Button type={"submit"} id={"delete-" + result.id.toString()}
                                className={"px-4 py-2 rounded bg-red text-white font-bold"}
                                onClick={() => deleteOnePuzzle(result.id)}>X</Button>
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
                            className="text-blue-500">{result.time && formatSeconds(600 - parseInt(result.time))}</span>
                    </p>
                    <div>
                        <h3 className="font-semibold text-gray-800">{t("codeSend")} :</h3>
                        <CodeBlock code={result.result || t("anyCodeDisplay")}/>
                    </div>
                </div>
            ))}
            <div className="flex justify-between items-center w-full">
                {currentPage > 1 ? (
                    <button className="px-4 py-2 rounded bg-petroleum-blue text-white"
                            onClick={prevPage}>{t("previous")}</button>
                ) : (
                    <div className="px-4 py-2 invisible">{t("previous")}</div>  // Invisible spacer
                )}
                <p className="text-center flex-grow">{currentPage}</p>
                {puzzleFinish.length > 0 ? (
                    <button className="px-4 py-2 rounded bg-petroleum-blue text-white"
                            onClick={nextPage}>{t("next")}</button>
                ) : (
                    <div className="px-4 py-2 invisible">{t("next")}</div>  // Invisible spacer
                )}
            </div>
        </div>

    );
};

export default PuzzleList;

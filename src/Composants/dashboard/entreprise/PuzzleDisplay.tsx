import {Pricing, PuzzlesEntreprise} from "../../../Interface/Interface.ts";
import Card from "../../../ComposantsCommun/Card.tsx";
import Button from "../../../ComposantsCommun/Button.tsx";
import {deletePuzzle} from "../../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import PuzzleForm from "./PuzzleForm.tsx";
import {useState} from "react";
import SendPuzzle from "./SendPuzzle.tsx";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

interface PuzzleDisplayProps {
    tabPuzzlesEntreprise: PuzzlesEntreprise[];
    setIsSubmitted: () => void;
    setPuzzleToPopup?: (value: PuzzlesEntreprise | undefined) => void;
    puzzleToPopup?: PuzzlesEntreprise;
    lastCommande?: Pricing;
}

const PuzzleDisplay = (
    {
        tabPuzzlesEntreprise = [],
        setIsSubmitted,
        setPuzzleToPopup,
        puzzleToPopup,
        lastCommande
    }: PuzzleDisplayProps) => {
    const [isPopupOpenModify, setPopupOpenModify] = useState(false);
    const [isPopupOpenSend, setPopupOpenSend] = useState(false);
    const authContext = useAuthContext();
    const {t} = useTranslation();

    /**
     * Gère de manière asynchrone la suppression d'un puzzle en effectuant un appel API.
     * Met à jour le compteur de soumissions si la suppression réussit.
     *
     * @param id - L'identifiant optionnel du puzzle à supprimer.
     * Si aucun identifiant n'est fourni, la fonction tentera tout de même de supprimer un puzzle,
     * mais peut échouer si l'API requiert un identifiant.
     */
    const handleClickDelete = async (id?: number) => {
        await deletePuzzle('puzzle/deletePuzzle', {
            token: authContext?.accessToken ?? "",
            puzzleId: id
        }).then(response => {
            if (response.ok) {
                setIsSubmitted();
            } else {
                console.error("Failed to delete the puzzle.");
            }
        }).catch(error => {
            console.error("Error when calling the API:", error);
        });
    }


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

    return (
        <div className="m-5">
            <div className="bg-tertiari shadow-xl overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-quaternary">{t("puzzleCreate")}</h3>
                    <ul className="mt-3 w-full text-sm text-quaternary flex flex-wrap justify-center">
                        {tabPuzzlesEntreprise.map((puzzle: PuzzlesEntreprise) => (
                            <li key={puzzle.id} className="bg-gris-chaud p-5 m-2 rounded-lg shadow">
                                <Card className="border-0">
                                    <h1 className="text-xl text-center font-bold uppercase m-3 sm:m-5 text-tertiari">{puzzle.title}</h1>
                                    <div
                                        className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center items-center m-5">
                                        <Button type="button" onClick={() => openPopup(puzzle, "1")}
                                                className="bg-petroleum-blue hover:shadow-md hover:shadow-light-blue text-white font-bold py-2 px-4 rounded"
                                                id="updateTitle">{t("modify")}</Button>
                                        <Button type="button"
                                                className="bg-olive-green hover:shadow-lg hover:shadow-olive-green text-white font-bold py-2 px-4 rounded"
                                                id="deleteTitle"
                                                onClick={() => openPopup(puzzle, "2")}>{t("sendPuzzle")}</Button>
                                        <Button type="button"
                                                className="bg-red hover:shadow-lg hover:shadow-rose-300 text-white font-bold py-2 px-4 rounded"
                                                id="deleteTitle"
                                                onClick={() => handleClickDelete(puzzle.id)}>{t("delete")}</Button>
                                    </div>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {isPopupOpenModify && (
                <div
                    className="fixed top-0 left-0 w-full h-full overflow-auto flex items-center justify-center bg-black bg-opacity-100 md:bg-opacity-75 z-50">
                    <PuzzleForm className="w-full max-w-4xl mx-auto m-auto p-4 rounded-lg shadow" title={puzzleToPopup?.title} details={puzzleToPopup?.details} tests={puzzleToPopup?.tests}
                                id={puzzleToPopup?.id?.toString()}
                                closePopup={closePopup} setIsSubmitted={() => setIsSubmitted()}
                                lastCommande={lastCommande} tabPuzzlesEntreprise={tabPuzzlesEntreprise}/>
                </div>
            )}
            {isPopupOpenSend && (
                <div
                    className={clsx("fixed top-0 pt-10 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-100 md:bg-opacity-75 z-50")}>
                    <SendPuzzle className="flex flex-col w-full m-10 h-full overflow-scroll sm:overflow-auto" closePopup={closePopup} puzzleToPopup={puzzleToPopup}/>
                </div>
            )}
        </div>
    )
}

export default PuzzleDisplay;
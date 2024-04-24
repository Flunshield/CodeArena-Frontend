import React, { useEffect, useState } from 'react';
import Layout from "../../ComposantsCommun/Layout.tsx";
import PuzzleForm from "../../Composants/entreprise/PuzzleForm.tsx";
import {deletePuzzle, getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import { useAuthContext } from "../../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { DataToken, PuzzlesEntreprise } from "../../Interface/Interface.ts";
import Card from '../../ComposantsCommun/Card.tsx';
import Button from "../../ComposantsCommun/Button.tsx";

const DashboardEntreprise: React.FC = () => {
    const [tabPuzzlesEntreprise, setTabPuzzlesEntreprise] = useState<PuzzlesEntreprise[]>([]);
    const [submitCount, setSubmitCount] = useState(0);
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [puzzleToUpdate, setPuzzleToUpdate] = useState<PuzzlesEntreprise>();

    const openPopup = (puzzle?: PuzzlesEntreprise) => {
        setPopupOpen(true);
        setPuzzleToUpdate(puzzle);
    };

    const closePopup = async () => {
        setPopupOpen(false);
    };

    const handleClickDelete = async (id?: number) => {
        await deletePuzzle('puzzle/deletePuzzle', {
            token: authContext.accessToken ?? "",
            puzzleId: id
        }).then(response => {
            if (response.ok) {
                setSubmitCount(count => count + 1);
            } else {
                console.error("Failed to delete the puzzle.");
            }
        }).catch(error => {
            console.error("Error when calling the API:", error);
        });
    }
    const fetchData = async () => {
        return await getElementByEndpoint('puzzle/findPuzzles?id=' + infos.data.id, {
            token: authContext.accessToken ?? "",
            data: ""
        });
    };
    useEffect(() => {
        fetchData().then(async (response) => {
            if(response.status === 200) {
                setTabPuzzlesEntreprise(await response.json());
            } else {
                setTabPuzzlesEntreprise([])
            }
        });
    }, [submitCount]);

    return (
        <Layout>
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PuzzleForm setIsSubmitted={() => setSubmitCount(count => count + 1)}/>
                    <div className="m-5">
                        <div className="bg-tertiari shadow-xl overflow-hidden rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-quaternary">Puzzle créé</h3>
                                <ul className="mt-3 w-full text-sm text-quaternary flex flex-wrap justify-center">
                                    {tabPuzzlesEntreprise.map((puzzle) => (
                                        <li key={puzzle.id} className="bg-gris-chaud p-5 m-2 rounded-lg shadow">
                                            <Card className="border-0">
                                                <h1 className="text-xl text-center font-bold uppercase m-5 text-tertiari">{puzzle.details}</h1>
                                                <div className="flex flex-row justify-center space-x-4">
                                                    <Button type="button" onClick={() => openPopup(puzzle)}
                                                            className="bg-petroleum-blue hover:shadow-xl text-white font-bold py-2 px-4 rounded"
                                                            id="updateTitle">Modifier</Button>
                                                    <Button type="button"
                                                            className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                            id="deleteTitle" onClick={() => handleClickDelete(puzzle.id)}>Supprimer</Button>
                                                </div>
                                            </Card>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <PuzzleForm className="w-full" details={puzzleToUpdate?.details} tests={puzzleToUpdate?.tests} id={puzzleToUpdate?.id?.toString()}
                                closePopup={closePopup} setIsSubmitted={() => setSubmitCount(count => count + 1)}/>
                </div>
            )}
        </Layout>
    );
};

export default DashboardEntreprise;

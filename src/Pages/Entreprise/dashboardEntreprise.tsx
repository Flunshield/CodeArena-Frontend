import React, {useEffect, useState} from 'react';
import Layout from "../../ComposantsCommun/Layout.tsx";
import PuzzleForm from "../../Composants/dashboard/entreprise/PuzzleForm.tsx";
import {getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken, Pricing, PuzzlesEntreprise} from "../../Interface/Interface.ts";
import PuzzleDisplay from "../../Composants/dashboard/entreprise/PuzzleDisplay.tsx";
import Stats from "../../Composants/dashboard/entreprise/Stats.tsx";
import {PRICING} from "../../constantes/constanteEntreprise.ts";

const DashboardEntreprise: React.FC = () => {
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const [tabPuzzlesEntreprise, setTabPuzzlesEntreprise] = useState<PuzzlesEntreprise[]>([]);
    const [submitCount, setSubmitCount] = useState(0);
    const [puzzleToPopup, setPuzzleToPopup] = useState<PuzzlesEntreprise>();

    const [lastCommande, setLastCommande] = useState<Pricing>();
    const findLastCommande = getElementByEndpoint('user/lastCommande?id=' + infos.data.id, {
        data: "",
        token: authContext.accessToken ?? ""
    })


    /**
     * Effectue une requête asynchrone pour récupérer les données d'un puzzle spécifique via un endpoint API.
     * Utilise un identifiant de puzzle extrait d'un objet `infos` pour construire l'URL de la requête.
     *
     * @returns Promise qui résout les données du puzzle ou rejette une erreur en cas d'échec de la requête.
     */
    const fetchData = async () => {
        return await getElementByEndpoint('puzzle/findPuzzles?id=' + infos.data.id, {
            token: authContext.accessToken ?? "",
            data: ""
        });
    };

    useEffect(() => {
        fetchData().then(async (response) => {
            if (response.status === 200) {
                setTabPuzzlesEntreprise(await response.json());
            } else {
                setTabPuzzlesEntreprise([])
            }
        });
        if (authContext.connected) {
            findLastCommande.then(async (response) => {
                const result = await response.json();
                setLastCommande(PRICING.find((elem) => {
                    return elem.idApi === result?.item
                }));
            });
        }
    }, [submitCount]);

    return (
        <Layout>
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Stats tabPuzzlesEntreprise={tabPuzzlesEntreprise} lastCommande={lastCommande}/>
                    <PuzzleForm setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                tabPuzzlesEntreprise={tabPuzzlesEntreprise} lastCommande={lastCommande}/>
                    <PuzzleDisplay tabPuzzlesEntreprise={tabPuzzlesEntreprise} puzzleToPopup={puzzleToPopup}
                                   setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                   setPuzzleToPopup={setPuzzleToPopup} lastCommande={lastCommande}/>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardEntreprise;

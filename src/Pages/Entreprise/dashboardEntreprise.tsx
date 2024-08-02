import {useEffect, useState} from 'react';
import Layout from "../../ComposantsCommun/Layout.tsx";
import PuzzleForm from "../../ComposantsCommun/PuzzleForm.tsx";
import {getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken, Pricing, PuzzlesEntreprise} from "../../Interface/Interface.ts";
import PuzzleDisplay from "../../Composants/dashboard/entreprise/PuzzleDisplay.tsx";
import Stats from "../../Composants/dashboard/entreprise/Stats.tsx";
import {PRICING} from "../../constantes/constanteEntreprise.ts";
import PuzzleList from "../../Composants/dashboard/entreprise/PuzzleList.tsx";
import Tableau from '../../Composants/classement/tableau.tsx';
import useUserInfos from "../../hook/useUserInfos.ts";

interface result {
    puzzlesPlayed: number;
    puzzleCreate: number;
}

function DashboardEntreprise() {
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const userId = infos.data.id;
    const [submitCount, setSubmitCount] = useState(0);
    const [puzzleToPopup, setPuzzleToPopup] = useState<PuzzlesEntreprise>();
    const infosUserById = useUserInfos();
    const [lastCommande, setLastCommande] = useState<Pricing>();
    const findLastCommande = getElementByEndpoint('user/lastCommande?id=' + userId, {
        data: "",
        token: authContext.accessToken ?? ""
    })
    const [nbPuzzlesPlayed, setNbPuzzlesPlayed] = useState(0);
    const [nbPuzzleCreated, setNbPuzzleCreated] = useState(0);
    const countPuzzles = async () => {
        return await getElementByEndpoint(`puzzle/countPuzzles?id=${userId}`, {
            token: authContext.accessToken ?? "",
            data: ''
        });
    };

    useEffect(() => {
        if (authContext.connected) {
            findLastCommande.then(async (response) => {
                const result = await response.json();
                setLastCommande(PRICING.find((elem) => {
                    return elem.idApi === result?.item
                }));
            });
            countPuzzles().then(async (response) => {
                const result: result = await response.json();
                if (response.status === 200) {
                    setNbPuzzlesPlayed(result.puzzlesPlayed);
                    setNbPuzzleCreated(result.puzzleCreate);
                }
            });
        }
    }, [submitCount]);

    return (
        <Layout>
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Stats lastCommande={lastCommande ?? PRICING[0]} submitCount={submitCount}
                           nbPuzzlesPlayed={nbPuzzlesPlayed}
                           nbPuzzleCreated={nbPuzzleCreated}/>
                    <PuzzleForm setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                nbPuzzleCreated={nbPuzzleCreated} lastCommande={lastCommande}/>
                    <PuzzleDisplay puzzleToPopup={puzzleToPopup}
                                   setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                   submitCount={submitCount}
                                   setPuzzleToPopup={setPuzzleToPopup} lastCommande={lastCommande}
                                   nbPuzzleCreated={nbPuzzleCreated} setSubmitCount={setSubmitCount}/>
                    <PuzzleList setIsSubmitted={() => setSubmitCount(count => count + 1)} submitCount={submitCount}
                                infosUserById={infosUserById}/>
                    <Tableau/>
                </div>
            </div>
        </Layout>
    );
}

export default DashboardEntreprise;

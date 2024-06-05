import Layout from "../../ComposantsCommun/Layout.tsx";
import {useEffect, useState} from "react";
import {getQueryParamValue} from "../../Helpers/methodeHelper.ts";
import {useNavigate} from "react-router-dom";
import {ERROR_PAGE, GAME_ENTREPRISE} from "../../constantes/constantesRoutes.ts";
import {VITE_API_BASE_URL_BACK} from "../../Helpers/apiHelper.ts";
import {useTranslation} from "react-i18next";
import LoaderMatch from "../../ComposantsCommun/LoaderMatch.tsx";

function LoadGame() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const token = getQueryParamValue("token");
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${VITE_API_BASE_URL_BACK}/entreprise/puzzleGame?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const reader = response.body!.getReader();
            const chunks = [];
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const {done, value} = await reader.read();
                if (done) {
                    break;
                }
                chunks.push(value);
            }
            // Properly concatenate Uint8Array chunks
            const totalLength = chunks.reduce((total, chunk) => total + chunk.length, 0);
            const chunksAll = new Uint8Array(totalLength);
            let position = 0;
            for (const chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }
            const result = new TextDecoder("utf-8").decode(chunksAll);
            if (response.status === 401 || response.status === 404) {
                navigate(ERROR_PAGE);
            }
            if (response.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    const reponse = JSON.parse(result);
                    navigate(GAME_ENTREPRISE, {state: {puzzle: reponse.puzzle, mailID: reponse.mailID, token: token}});
                }, 2000);
            }
        } catch
            (error) {
            console.error(error);
            navigate(ERROR_PAGE);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            {loading && (
                <div className="flex justify-center items-center h-screen">
                    <LoaderMatch msg={t('loadTest')} className="z-50 bg-gris-chaud rounded-lg"/>
                </div>
            )}
        </Layout>
    );
}

export default LoadGame;

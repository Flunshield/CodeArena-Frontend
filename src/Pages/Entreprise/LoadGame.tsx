import Layout from "../../ComposantsCommun/Layout.tsx";
import ProgressBar from "../../ComposantsCommun/ProgressBar.tsx";
import {useEffect, useState} from "react";
import {getQueryParamValue} from "../../Helpers/methodeHelper.ts";
import {useNavigate} from "react-router-dom";
import {ERROR_PAGE, GAME_ENTREPRISE} from "../../constantes/constantes.ts";
import {VITE_API_BASE_URL_BACK} from "../../Helpers/apiHelper.ts";
import {useTranslation} from "react-i18next";

const LoadGame = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const token = getQueryParamValue("token");

    useEffect(() => {
        const url = `${VITE_API_BASE_URL_BACK}/entreprise/puzzleGame?token=${token}`;
        const controller = new AbortController();

        const simulateLoading = () => {
            let timeElapsed = 0;
            const totalLoadingTime = 5000; // 5 seconds
            const interval = 250; // 50ms intervals for updating progress

            const intervalId = setInterval(async () => {
                timeElapsed += interval;
                const remainingTime = totalLoadingTime - timeElapsed;
                const maxPossibleProgress = 100 - progress;
                const randomIncrement = (Math.random() * 10 + 50);
                const progressIncrease = Math.min(randomIncrement * maxPossibleProgress, maxPossibleProgress * interval / remainingTime);
                const newProgress = progress + progressIncrease;
                setProgress(newProgress);

                if (timeElapsed >= totalLoadingTime) {
                    clearInterval(intervalId);
                    setProgress(100);
                    await fetchData();
                }
            }, interval);
        };

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    signal: controller.signal,
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
                    const reponse = JSON.parse(result);
                    navigate(GAME_ENTREPRISE, {state: {puzzle: reponse.puzzle, mailID: reponse.mailID, token: token}});
                }
            } catch (error) {
                console.error('Fetching error:', error);
            }
        };

        simulateLoading();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center w-full min-h-screen">
                <div className="text-lg mb-4 text-tertiari">{t('chargement')} {parseInt(String(progress))}%</div>
                <ProgressBar progress={progress}/>
            </div>
        </Layout>
    );
};

export default LoadGame;

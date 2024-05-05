import {SetStateAction, useEffect, useState} from "react";
import Layout from "../../ComposantsCommun/Layout.tsx";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import ThemeSelector from "../../Composants/game/ThemeSelector.tsx";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import MyTimer from "../../ComposantsCommun/myTimer.tsx";
import {postElementByEndpoint, postTest} from "../../Helpers/apiHelper.ts";
import {responseTest} from "../../Interface/Interface.ts";
import Button from "../../ComposantsCommun/Button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {DIX_MIN} from "../../constantes.ts";
import {RESULT_PAGE, TEST_JS} from "../../constantes/constantes.ts";
import {useTranslation} from "react-i18next";

function GameEntreprise () {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [code, setCode] = useState('');
    const [theme, setTheme] = useState('monokai');
    const [remainingTime, setRemainingTime] = useState(() => Number(localStorage.getItem('remainingTime')) || DIX_MIN);
    const [isDisabled, setIsDisabled] = useState(false);
    const [testPassed, setTestPassed] = useState<string[]>([]);
    const [testFailed, setTestFailed] = useState<string[]>([]);
    const [results, setResults] = useState<responseTest>();
    const [testTested, setTestTested] = useState(false);
    const location = useLocation();
    const puzzle = location.state.puzzle;
    const mailID = location.state.mailID;
    const token = location.state.token;

    const testsAjouer = puzzle.tests;
    const handleChange = (newCode: SetStateAction<string>) => {
        setCode(newCode);
    };

    const handleSendTest = () => {
        postTest(TEST_JS, {code: code, tests: testsAjouer}).then(async (response) => {
            const result: responseTest = await response.json();
            if (result) {
                setTestPassed(result.testPassed);
                setTestFailed(result.testFailed);
                setResults(result);
                setTestTested(true);
            }
        });
    };

    const handleSendCode = async () => {
        const sendData = await postElementByEndpoint("entreprise/puzzleGame", {
            token: token,
            data: {
                "mailID": mailID,
                "validated": true,
                "result": code,
                "testValidated": results?.testPassed.length,
                "remainingTime": DIX_MIN - remainingTime,
            }
        });

        if (sendData.status === 201) {
            navigate(RESULT_PAGE, {state: {success: true}});
        }
        if (sendData.status === 404) {
            navigate(RESULT_PAGE, {state: {success: false}});
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => {
                const newTime = prevTime > 0 ? prevTime - 1 : 0;
                localStorage.setItem('remainingTime', newTime.toString());
                return newTime;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (remainingTime === 0) {
            setIsDisabled(true);
            handleSendTest();
        }
    }, [remainingTime]);
    return (
        <Layout>
            <div className="mx-auto max-w-7xl p-4 h-full">
                <MyTimer expiryTimestamp={new Date(new Date().getTime() + remainingTime * 1000)}
                         setRemainingTime={setRemainingTime}/>
                <div className="flex flex-col-reverse md:flex-row">
                    <div className="mt-10 flex-1">
                        <ThemeSelector setSelectedTheme={setTheme} selectedTheme={theme}/>
                        <AceEditor
                            mode="javascript"
                            theme={theme}
                            value={code}
                            onChange={handleChange}
                            name="AceEditor"
                            editorProps={{$blockScrolling: true}}
                            style={{height: '500px', width: '100%'}}
                            className="border-2 border-white rounded-md"
                            readOnly={isDisabled}
                        />
                    </div>
                    <Card className="mt-4 flex-2 md:mt-0 md:ml-10 border-0">
                        <CardContent className="flex justify-center flex-col p-4 text-white">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{t('sujet')}</h2>
                            <p className="mt-2 text-sm md:text-base lg:text-lg">{puzzle.details}</p>
                        </CardContent>
                        <CardContent className="flex justify-center flex-col p-4 text-white border-2 rounded-md">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{t('stateOfTest')}</h2>
                            <ul>
                                <li>
                                    <p>{t('testPassed')} {testPassed.length} / {testsAjouer.length}</p>
                                    <ul>
                                        {testPassed.map((test) => (
                                            <li key={test}>
                                                <p className="font-bold text-green-600">{test}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-5">
                                    <p>Tests ratés {testFailed.length} / {testsAjouer.length}</p>
                                    <ul>
                                        {testFailed.map((test) => (
                                            <li key={test}>
                                                <p className="font-bold text-red">{test}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </CardContent>
                        <Button id="btn-send-test" type="button"
                                className="border-2 rounded-md mt-5 p-2 w-auto text-white bg-green-800"
                                onClick={handleSendTest}>{t('testYourCode')}</Button>
                        {testTested &&
                        <Button id="btn-send-test" type="button"
                                className="border-2 rounded-md mt-5 p-2 w-auto text-white bg-green-800"
                                onClick={handleSendCode}>{t('sendYourCode')}</Button>
                        }
                    </Card>
                </div>
            </div>
        </Layout>
    );
}

export default GameEntreprise;

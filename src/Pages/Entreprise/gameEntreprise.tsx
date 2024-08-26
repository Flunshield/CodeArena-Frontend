import { useState, useEffect, SetStateAction } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "../../ComposantsCommun/Layout";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import ThemeSelector from "../../Composants/game/ThemeSelector";
import Card from "../../ComposantsCommun/Card";
import CardContent from "../../ComposantsCommun/CardContent";
import MyTimer from "../../ComposantsCommun/myTimer";
import Button from "../../ComposantsCommun/Button";
import { postElementByEndpoint, postTest } from "../../Helpers/apiHelper";
import { responseTest } from "../../Interface/Interface";
import { RESULT_PAGE, TEST_JS } from "../../constantes/constantesRoutes";

const GameEntreprise = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const location = useLocation();
    const { puzzle, mailID, token } = location.state;
    const [code, setCode] = useState('');
    const [theme, setTheme] = useState('monokai');
    const [remainingTime, setRemainingTime] = useState(() => Number(sessionStorage.getItem('remainingTime')) || parseInt(puzzle.time));
    const [isDisabled, setIsDisabled] = useState(false);
    const [testPassed, setTestPassed] = useState<string[]>([]);
    const [testFailed, setTestFailed] = useState<string[]>([]);
    const [results, setResults] = useState<responseTest>();
    const [testTested, setTestTested] = useState(false);
    const testsAjouer = puzzle.tests;

    const handleChange = (newCode: SetStateAction<string>) => {
        setCode(newCode);
    };

    const handleSendTest = async () => {
        const response = await postTest(TEST_JS, { code, tests: testsAjouer });
        const result: responseTest = await response.json();
        if (result) {
            setTestPassed(result.testPassed);
            setTestFailed(result.testFailed);
            setResults(result);
            setTestTested(true);
        }
    };

    const handleSendCode = async () => {
        const sendData = await postElementByEndpoint("entreprise/puzzleGame", {
            token,
            data: {
                mailID,
                validated: true,
                result: code,
                testValidated: results?.testPassed.length,
                remainingTime: parseInt(puzzle.time) - remainingTime,
            }
        });

        navigate(RESULT_PAGE, { state: { success: sendData.status === 201 } });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevTime: number) => {
                const newTime = prevTime > 0 ? prevTime - 1 : 0;
                sessionStorage.setItem('remainingTime', newTime.toString());
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (remainingTime === 0) {
            setIsDisabled(true);
            handleSendTest();
        }
    }, [remainingTime]);

    return (
        <Layout>
            <div className="mx-auto m-5 mt-10 pb-10 rounded-xl max-w-7xl p-4 bg-secondary text-tertiari">
                <MyTimer expiryTimestamp={new Date(new Date().getTime() + remainingTime * 1000)} setRemainingTime={setRemainingTime} />
                <div className="flex flex-col-reverse md:flex-row">
                    <div className="mt-10 flex-1">
                        <ThemeSelector setSelectedTheme={setTheme} selectedTheme={theme} />
                        <AceEditor
                            mode="javascript"
                            theme={theme}
                            value={code}
                            onChange={handleChange}
                            name="AceEditor"
                            editorProps={{ $blockScrolling: true }}
                            style={{ height: '500px', width: '100%' }}
                            className="border-2 border-white rounded-md"
                            readOnly={isDisabled}
                        />
                    </div>
                    <Card className="mt-4 flex-2 md:mt-0 md:ml-10 border-0">
                        <CardContent className="flex justify-center flex-col p-4">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{t('sujet')}</h2>
                            <p className="mt-2 text-sm md:text-base lg:text-lg">{puzzle.details}</p>
                        </CardContent>
                        <CardContent className="flex justify-center flex-col p-4 border-2 rounded-md">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{t('stateOfTest')}</h2>
                            <ul>
                                <li>
                                    <p>{t('testPassed')} {testPassed.length} / {testsAjouer.length}</p>
                                    <ul>
                                        {testPassed.map(test => (
                                            <li key={test} className="font-bold text-green-600">{test}</li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-5">
                                    <p>{t('testFailed')} {testFailed.length} / {testsAjouer.length}</p>
                                    <ul>
                                        {testFailed.map(test => (
                                            <li key={test} className="font-bold text-red-600">{test}</li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </CardContent>
                        <Button type="button" id="btn-test" className="border-2 rounded-md mt-5 p-2 w-auto bg-green-800" onClick={handleSendTest}>
                            {t('testYourCode')}
                        </Button>
                        {testTested && (
                            <Button type="button" id="btn-send" className="border-2 rounded-md mt-5 p-2 w-auto bg-green-800" onClick={handleSendCode}>
                                {t('sendYourCode')}
                            </Button>
                        )}
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default GameEntreprise;

import { SetStateAction, useEffect, useState} from "react";
import Layout from "../ComposantsCommun/Layout.tsx";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import ThemeSelector from "../Composants/game/ThemeSelector.tsx";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import MyTimer from "../ComposantsCommun/myTimer.tsx";
import {postTest} from "../Helpers/apiHelper.ts";
import {responseTest} from "../Interface/Interface.ts";
import Button from "../ComposantsCommun/Button.tsx";


const Game = () => {
    const [code, setCode] = useState('');
    const [theme, setTheme] = useState('monokai');
    const [remainingTime, setRemainingTime] = useState(600);
    const [isDisabled, setIsDisabled] = useState(false);
    const [testPassed, setTestPassed] = useState<string[]>([]);
    const [testFailed, setTestFailed] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);

    const testsAjouer = [
        {
            "name": "Test 1",
            "condition": "add(1, 2) === 3",
            "successMessage": "Test 1 passed",
            "failureMessage": "Test 1 failed"
        },
        {
            "name": "Test 2",
            "condition": "add(2, 6) === 8",
            "successMessage": "Test 2 passed",
            "failureMessage": "Test 2 failed"
        },
        {
            "name": "Test 3",
            "condition": "add(2, 3) === 5",
            "successMessage": "Test 3 passed",
            "failureMessage": "Test 3 failed"
        }
    ]

    const handleChange = (newCode: SetStateAction<string>) => {
        setCode(newCode);
    };

    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

    const handleSendTest = () => {
        postTest('testsJs', {code: code, tests: testsAjouer}).then(async (response) => {
            const result: responseTest = await response.json();
            if (result) {
                setTestPassed(result.testPassed);
                setTestFailed(result.testFailed);
                setSuccess(result.success);
            } else {
                console.log('Test failed');
            }
        });
    }
    useEffect(() => {
        if(remainingTime === 0){
            setIsDisabled(true);
            handleSendTest();
        }
    }, [remainingTime]);

    return (
        <Layout>
            <div className="m-32">

                <div>
                    <MyTimer expiryTimestamp={time} setRemainingTime={setRemainingTime}/>
                </div>
                <ThemeSelector setSelectedTheme={setTheme} selectedTheme={theme}/>
                <div className="flex flex-row">
                    <AceEditor
                        mode="javascript"
                        theme={theme}
                        value={code}
                        onChange={handleChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                        style={{width: '60%', height: '500px'}}
                        className="border-2 border-white rounded-md"
                        readOnly={isDisabled}
                    />
                    <Card className="ml-10 border-0">
                        <CardContent className="flex justify-center flex-col p-0 text-white">
                            <h2 className="text-3xl font-bold">Sujet</h2>
                            <p className="mt-5">Créer une fonction permettant d&lsquo;additionner.</p>
                        </CardContent>
                        <CardContent className="flex justify-center flex-col p-0 text-white border-2 rounded-md">
                            <h2 className="text-3xl font-bold">Etat des Tests</h2>
                            <ul>
                                <li>
                                    <p>Tests passés {testPassed.length} / {testsAjouer.length}</p>
                                    <ul>
                                        {testPassed.map((test) => (
                                            <li key={test} className="">
                                                <p className="font-bold text-green-600">{test}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-5">
                                    <p>Tests ratés {testFailed.length} / {testsAjouer.length}</p>
                                    <ul>
                                        {testFailed.map((test) => (
                                            <li key={test} className="">
                                                <p className="font-bold text-red">{test}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </CardContent>
                        <Button id="btn-send-test" type="button" className="border-2 rounded-md mt-5 p-2 w-auto text-white bg-green-800" onClick={handleSendTest}>Teste ton code</Button>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Game;

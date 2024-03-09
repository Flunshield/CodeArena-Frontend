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
    time.setSeconds(time.getSeconds() + 5); // 10 minutes timer

    useEffect(() => {
        if(remainingTime === 0){
            setIsDisabled(true);
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
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Game;

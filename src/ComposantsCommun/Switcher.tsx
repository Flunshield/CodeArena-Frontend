import React from 'react';
import Button from "./Button.tsx";
import Card from "./Card.tsx";
import clsx from "clsx";


interface SwitcherProps {
    setCurrentHome: (currentHome: boolean) => void;
    currentHome: boolean;
}

const Switcher: React.FC<SwitcherProps> = (data) => {
    const {setCurrentHome, currentHome} = data;

    function goToDevHome() {
        setCurrentHome(false)
    }

    function goToWorkOffice() {
        setCurrentHome(true)
    }

    return (
        <div className="mt-10 absolute w-full z-50">
            <div className="flex justify-center">
                <Card className="flex p-5 border-0 bg-secondary">
                    <Button
                        id="btnDev"
                        type={'button'}
                        className={clsx(!currentHome ? "bg-gray-700 text-white" : "bg-primary text-white", "p-2 w-52 px-4 py-2 rounded-lg  font-bold transition duration-300 ease-in-out hover:bg-white hover:text-black")}
                        onClick={() => goToDevHome()}
                    >
                        <p>DEV</p>
                    </Button>
                    <Button
                        id="btnEntreprise"
                        type={'button'}
                        className={clsx(currentHome ? "bg-gray-700 text-white" : "bg-primary text-white", "p-2 w-52 px-4 py-2 rounded-lg font-bold transition duration-300 ease-in-out hover:bg-white hover:text-black")}
                        onClick={() => goToWorkOffice()}
                    >
                        Entreprise
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Switcher;

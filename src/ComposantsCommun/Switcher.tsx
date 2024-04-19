import React from 'react';
import Button from "./Button.tsx";
import Card from "./Card.tsx";
import clsx from "clsx";


interface SwitcherProps {
    setCurrentHome: (currentHome: boolean) => void;
    currentHome: boolean;
    className?: string;
}

const Switcher: React.FC<SwitcherProps> = (data) => {
    const {setCurrentHome, currentHome, className} = data;

    function goToDevHome() {
        setCurrentHome(false)
    }

    function goToWorkOffice() {
        setCurrentHome(true)
    }

    return (
        <div className={clsx(className)}>
            <div className="flex justify-center">
                <Card className="flex p-5 border-0 bg-secondary">
                    <Button
                        id="btnDev"
                        type={'button'}
                        className={clsx(!currentHome ? "bg-gray-700 text-tertiari" : "bg-primary text-tertiari", "p-2 w-20 md:w-48 px-4 py-2 rounded-lg font-bold transition duration-300 ease-in-out hover:bg-tertiari hover:text-black")}
                        onClick={() => goToDevHome()}
                    >
                        <p>DEV</p>
                    </Button>
                    <Button
                        id="btnEntreprise"
                        type={'button'}
                        className={clsx(currentHome ? "bg-gray-700 text-tertiari" : "bg-primary text-tertiari", "p-2 w-28 md:w-48 px-4 py-2 rounded-lg font-bold transition duration-300 ease-in-out hover:bg-tertiari hover:text-black")}
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

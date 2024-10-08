import React from 'react';
import Button from "./Button.tsx";
import Card from "./Card.tsx";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';


interface SwitcherProps {
    setCurrentHome: (currentHome: boolean) => void;
    currentHome: boolean;
    className?: string;
}

const Switcher: React.FC<SwitcherProps> = (data) => {
    const { t } = useTranslation();
    const { setCurrentHome, currentHome, className } = data;

    function goToDevHome() {
        setCurrentHome(false)
    }

    function goToWorkOffice() {
        setCurrentHome(true)
    }

    return (
        <div className={clsx(className)}>
        <div className="flex justify-center">
            <Card className="flex p-5 px-9 m-7 sm:m-10 border-0   bg-secondary">
                <Button
                    id="btnDev"
                    type={'button'}
                    className={clsx(!currentHome ? "bg-gray-700 text-tertiari" : "bg-primary text-tertiari", "p-2 md:w-48 px-4 py-2 rounded-lg font-bold transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 shadow-angelic-white")}
                    onClick={() => goToDevHome()}
                >
                    <p>{t('Dev')}</p>
                </Button>
                <div className="hidden md:block w-4"></div> {/* Espacement entre les boutons sur les écrans moyens et grands */}
                <Button
                    id="btnEntreprise"
                    type={'button'}
                    className={clsx(currentHome ? "bg-gray-700 text-tertiari" : "bg-primary text-tertiari", "p-2 md:w-48 px-4 py-2 rounded-lg font-bold transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 shadow-angelic-white")}
                    onClick={() => goToWorkOffice()}
                >
                    <p>{t('entreprise')}</p>
                </Button>
            </Card>
        </div>
    </div>
    


    );
};

export default Switcher;

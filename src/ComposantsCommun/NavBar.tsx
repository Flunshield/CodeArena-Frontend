import Card from "./Card.tsx";
import Button from "./Button.tsx";
import iconeMenu from "/assets/menu.png";
import btnClose from "/assets/btnClose.png";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import logo from "/assets/logo.svg";
import event from "/assets/event.png";
import tournois from "/assets/tournois.png";
import classement from "/assets/classement.png";
import ranked from "/assets/ranked.png";
import dashboard from "/assets/dashboard.png";
import clsx from "clsx";
import {DASHBOARD, EVENT, RANKED, RANKING, TOURNAMENT} from "../constantes/constantes.ts";
import {checkUrl} from "../Helpers/methodeHelper.ts";

const NavBar = () => {
    const {t} = useTranslation();
    const mainFooter = document.getElementById("mainFooter")
    const [currentPage, setCurrentPage] = useState<string>();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            mainFooter?.classList.add("blur-sm")
            document.body.style.overflow = "hidden";
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        } else {
            mainFooter?.classList.remove("blur-sm")
            document.body.style.overflow = "auto";
        }

        setCurrentPage(checkUrl())
    }, [isOpen]);
    return (
        <div>
            <Button
                type="button"
                id="navBarButton"
                onClick={toggleNavbar}
                className="border-0 ml-5 mt-0.5 w-12"
            >
                <img src={iconeMenu} alt="icone menu" className="w-12 mt-2"/>
            </Button>
            {isOpen && (
                <Card
                    className="w-full z-10 md:w-1/3 border-0 border-r border-b h-screen absolute rounded-tr-2xl rounded-br-2xl rounded-tl-none rounded-bl-none top-0 bg-primary border-tertiari">
                    <nav className="block flex-col text-tertiari text-2xl font-bold">
                        <div className="flex flex-row justify-between">
                            <img
                                className="w-12 mt-3 ml-3"
                                src={logo}
                                alt="logo du site web"/>

                            <Button
                                type="button"
                                id="navBarButtonClose"
                                onClick={toggleNavbar}
                                className="border-0"
                            >
                                <img src={btnClose} alt="icone bouton clsoe" className="w-6 h-6 mt-3 mr-3"/>
                            </Button>
                        </div>
                        <ul>
                            <li className={clsx(currentPage === "dashboard" ? " bg-secondary pl-3" : "", "ml-3 flex flex-row rounded-lg w-72 hover:bg-secondary")}
                                id="link-dashboard">
                                <img src={dashboard} alt="icone bouton clsoe" className="w-6 h-6 mt-5"/>
                                <a href={DASHBOARD} className="p-4 hover:underline" id="click-dashboard">
                                    {t("home")}</a>
                            </li>
                            <li className={clsx(currentPage === "ranked" ? " bg-secondary pl-3" : "", "ml-3 flex flex-row rounded-lg w-72 hover:bg-secondary")}
                                id="link-ranked">
                                <img src={ranked} alt="icone bouton clsoe" className="w-6 h-6 mt-5"/>
                                <a href={RANKED} className="p-4 hover:underline" id="click-ranked">
                                    {t("ranked")}</a>
                            </li>
                            <li className={clsx(currentPage === "ranking" ? " bg-secondary pl-3" : "", "ml-3 flex flex-row rounded-lg w-72 hover:bg-secondary")}
                                id="link-ranking">
                                <img src={classement} alt="icone bouton clsoe" className="w-6 h-6 mt-5"/>
                                <a href={RANKING} className="p-4 hover:underline" id="click-ranking">
                                    {t("ranking")}</a>
                            </li>
                            <li className={clsx(currentPage === "tournaments" ? " bg-secondary pl-3" : "", "ml-3 flex flex-row rounded-lg w-72 hover:bg-secondary")}
                                id="link-tournaments">
                                <img src={tournois} alt="icone bouton clsoe" className="w-6 h-6 mt-5"/>
                                <a href={TOURNAMENT} className="p-4 hover:underline" id="click-tournaments">
                                    {t("tournaments")}</a>
                            </li>
                            <li className={clsx(currentPage === "event" ? " bg-secondary pl-3" : "", "ml-3 flex flex-row rounded-lg w-72 hover:bg-secondary")}
                                id="link-event">
                                <img src={event} alt="icone bouton clsoe" className="w-6 h-6 mt-5"/>
                                <a href={EVENT} className="p-4 hover:underline" id="click-event">
                                    {t("event")}</a>
                            </li>
                        </ul>
                    </nav>
                </Card>
            )}
        </div>
    );
};

export default NavBar;

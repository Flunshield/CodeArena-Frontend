import React, {useState} from "react";
import {Titles} from "../../Interface/Interface.ts";
import Button from "../../ComposantsCommun/Button.tsx";
import {useTranslation} from "react-i18next";
import {deleteTitle} from "../../Helpers/apiHelper.ts";
import {useNavigate} from "react-router-dom";
import FormTitre from "./FormTitre.tsx";

interface ListTitleProps {
    titles: Titles[];
    token: string;
}

const ListTitle: React.FC<ListTitleProps> = (data) => {
    const {titles, token} = data;
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isType, setIsType] = useState(0);
    const [titleToUpdate, setTitleToUpdate] = useState<Titles>({id: 0, label: "", value: ""});

    const openPopup = (type: number, title?: Titles) => {
        setPopupOpen(true);
        if (type === 1 && title !== undefined) {
            setTitleToUpdate(title)
        }
        setIsType(type)
    };

    const closePopup = async () => {
        setPopupOpen(false);
    };

    const deleteTitleFunction = async (title: Titles) => {
        await deleteTitle("admin/deleteTitle", {token: token, title: title});
        navigate(0);
    }

    return (
        <div>
            <h2>Liste des titres</h2>
            <div className="flex flex-row">
                {titles.length > 0 ?
                    <ul className="flex flex-wrap">
                        {titles.map((title: Titles) => (
                            <li key={title.id}
                                className="m-5 p-5 border-2 rounded-lg bg-zinc-800 flex flex-col">
                                <p>
                                    {t('labelTitre')} : <span className="font-bold">{title.label}</span>
                                </p>
                                <p>
                                    {t('valeurTitre')} : <span className="font-bold">{title.value}</span>
                                </p>
                                <div className="flex flex-row">
                                    <Button type="button" onClick={() => openPopup(1, title)}
                                            className="border-2 bg-tertiari rounded-lg text-secondary p-2 mt-5 mr-5"
                                            id="updateTitle">{t("update")}</Button>
                                    <Button type="button" onClick={() => deleteTitleFunction(title)}
                                            className="border-2 bg-red rounded-lg text-secondary p-2 mt-5"
                                            id="deleteTitle">{t("delete")}</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    :
                    <div className="m-5 p-5 border-2 rounded-lg bg-zinc-800 flex flex-col">
                        <p>{t('nottitle')}</p>
                    </div>
                }
                <Button type="button" onClick={() => openPopup(2)}
                        className="border-2 bg-tertiari rounded-lg text-secondary p-2 mt-5 mr-5"
                        id="updateTitle">+</Button>
            </div>
            {isPopupOpen && (isType === 1 || isType === 2) && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90">
                    <div className="bg-secondary p-8 rounded-md flex flex-col">
                        <FormTitre onClose={closePopup} title={titleToUpdate} type={isType}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListTitle;

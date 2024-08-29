import React, {useState} from "react";
import {Titles} from "../../Interface/Interface.ts";
import Button from "../../ComposantsCommun/Button.tsx";
import {useTranslation} from "react-i18next";
import {deleteTitle} from "../../Helpers/apiHelper.ts";
import FormTitre from "./FormTitre.tsx";
import {useAuthContext} from "../../AuthContext.tsx";
import Notification from "../../ComposantsCommun/Notification.tsx";

interface ListTitleProps {
    titles: Titles[];
    setIsSubmitted: () => void;
}

const ListTitle: React.FC<ListTitleProps> = ({titles, setIsSubmitted}) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? "";
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isType, setIsType] = useState(0);
    const [titleToUpdate, setTitleToUpdate] = useState<Titles>({id: 0, label: "", value: ""});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const openPopup = (type: number, title?: Titles) => {
        setPopupOpen(true);
        setIsType(type);
        if (type === 1 && title) {
            setTitleToUpdate(title);
        }
        setIsSubmitted();
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const deleteTitleFunction = async (title: Titles) => {
        const result = await deleteTitle("admin/deleteTitle", {token, title});
        if (result.status === 200) {
            setNotificationMessage(t('updateSuccess'));
            setNotificationType('success');
            setShowNotification(true);
            setIsSubmitted();
        } else {
            setNotificationMessage(t('updateError'));
            setNotificationType('error');
            setShowNotification(true);
        }
    };

    return (
        <div className="px-4 py-2">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <h2 className="text-lg font-semibold text-tertiari mb-4">{t('listOfTitle')}</h2>
            <div className="flex flex-col justify-center">
                {titles.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-tertiari dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6 w-1/3">
                                {t('labelTitre')}
                            </th>
                            <th scope="col" className="py-3 px-6 w-1/3">
                                {t('valeurTitre')}
                            </th>
                            <th scope="col" className="py-3 px-6 w-1/3">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {titles.map((title) => (
                            <tr key={title.id} className="bg-tertiari border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-4 px-6">{title.label}</td>
                                <td className="py-4 px-6">{title.value}</td>
                                <td className="py-4 px-6">
                                    <div className="flex space-x-2">
                                        <Button
                                            type="button"
                                            onClick={() => openPopup(1, title)}
                                            className="bg-tertiari hover:bg-light-blue text-quaternary font-medium py-2 px-4 rounded-lg mr-2"
                                            id="updateTitle"
                                        >
                                            {t("update")}
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => deleteTitleFunction(title)}
                                            className="bg-error hover:bg-red-700 text-tertiari font-medium py-2 px-4 rounded-lg"
                                            id="deleteTitle"
                                        >
                                            {t("delete")}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                ) : (
                    <div className="bg-quaternary m-2 p-4 rounded-md shadow-lg w-full text-center">
                        <p className="text-tertiari">{t('nottitle')}</p>
                    </div>
                )}
                <Button type="button" onClick={() => openPopup(2)}
                        className="bg-golden-yellow hover:bg-yellow-600 text-quaternary font-medium py-2 px-4 rounded-lg mt-5"
                        id="addTitle">{t("addTitle")}
                </Button>
            </div>
            {isPopupOpen && (isType === 1 || isType === 2) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-secondary p-8 rounded-lg">
                        <FormTitre setIsSubmitted={setIsSubmitted} onClose={closePopup} title={titleToUpdate} type={isType}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListTitle;
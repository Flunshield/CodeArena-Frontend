import {useFormik} from "formik";
import * as Yup from "yup";
import {Titles} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import React, {useState} from "react";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import Notification from "../../ComposantsCommun/Notification.tsx";

interface formTitreProps {
    onClose: () => void;
    title: Titles;
    type: number;
}

const FormTitre: React.FC<formTitreProps> = ({onClose, title, type}) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const initialValues: Titles = {
        label: title.label,
        value: title.value,
    }
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const onSubmit = async (values: Titles) => {
        if (type === 1) {
            values.id = title.id;
            const result = await postElementByEndpoint("admin/updateTitles", {
                token: authContext.accessToken ?? "",
                data: values
            });
            if (result.status === 201) {
                setNotificationMessage(t('updateSuccess'));
                setNotificationType('success');
                setShowNotification(true);
            } else {
                setNotificationMessage(t('errorUpdate'));
                setNotificationType('error');
                setShowNotification(true);
            }
        }
        if (type === 2) {
            const result = await postElementByEndpoint("admin/createTitles", {
                token: authContext.accessToken ?? "",
                data: values
            });
            if (result.status === 200) {
                setNotificationMessage(t('createSuccess'));
                setNotificationType('success');
                setShowNotification(true);
            } else {
                setNotificationMessage(t('errorCreate'));
                setNotificationType('error');
                setShowNotification(true);
            }
        }
        setTimeout(() => {
            onClose();
        }, 1000);
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            label: Yup.string(),
            value: Yup.string(),
        }),
        onSubmit,
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="flex flex-col w-full mb-10">
                <p className="text-tertiari font-bold text-2xl text-center mb-6">{t("TitlesUpdate")}</p>
                <ul className="flex flex-col mt-5">
                    <li className="flex flex-row mb-2">
                        <p className="font-bold text-tertiari mr-10">{t("label")} : </p>
                        <input
                            type="text"
                            id="label"
                            className="bg-primary text-tertiari"
                            {...formik.getFieldProps('label')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <p className="font-bold text-tertiari mr-5">{t("value")} : </p>
                        <input
                            type="text"
                            id="value"
                            className="bg-primary text-tertiari ml-4"
                            {...formik.getFieldProps('value')}
                        />
                    </li>
                </ul>
            </div>
            <div className="flex flex-row justify-center">
                <button type="submit" className="text-tertiari mr-6 border-2 border-tertiari rounded-lg p-2">
                    {t("update")}
                </button>
                <button type="button" onClick={onClose} className="text-tertiari mr-6 bg-secondary rounded-lg p-2">
                    {t("close")}
                </button>
            </div>
        </form>
    )
}
export default FormTitre;
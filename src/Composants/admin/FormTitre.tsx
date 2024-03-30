import {useFormik} from "formik";
import * as Yup from "yup";
import {Titles} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import React from "react";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useNavigate} from "react-router-dom";

interface formTitreProps {
    onClose: () => void;
    title: Titles;
    type: number;
}

const FormTitre: React.FC<formTitreProps> = ({onClose, title, type}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const initialValues: Titles = {
        label: title.label,
        value: title.value,
    }

    const onSubmit = async (values: Titles) => {
        if(type === 1) {
            values.id = title.id;
            postElementByEndpoint("admin/updateTitles", {token: authContext.accessToken ?? "", data: values});
        }
        if(type === 2) {
            postElementByEndpoint("admin/createTitles", {token: authContext.accessToken ?? "", data: values});
        }
        navigate(0);
        onClose();
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
            <div className="flex flex-col w-full mb-10">
                <p className="text-white font-bold text-2xl text-center mb-6">{t("TitlesUpdate")}</p>
                <ul className="flex flex-col mt-5">
                    <li className="flex flex-row mb-2">
                        <p className="font-bold text-white mr-10">{t("label")} : </p>
                        <input
                            type="text"
                            id="label"
                            className="bg-primary text-white"
                            {...formik.getFieldProps('label')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <p className="font-bold text-white mr-5">{t("value")} : </p>
                        <input
                            type="text"
                            id="value"
                            className="bg-primary text-white ml-4"
                            {...formik.getFieldProps('value')}
                        />
                    </li>
                </ul>
            </div>
            <div className="flex flex-row justify-center">
                <button type="submit" className="text-white mr-6 border-2 border-white rounded-lg p-2">
                    {t("update")}
                </button>
                <button type="button" onClick={onClose} className="text-white mr-6 bg-secondary rounded-lg p-2">
                    {t("close")}
                </button>
            </div>
        </form>
    )
}
export default FormTitre;
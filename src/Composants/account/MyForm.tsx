import {useFormik} from 'formik';
import * as Yup from 'yup';
import company from "/assets/iconeProfile/company.png";
import github from "/assets/iconeProfile/github.png";
import link from "/assets/iconeProfile/link.png";
import map from "/assets/iconeProfile/map-marker.png";
import school from "/assets/iconeProfile/school.png";
import iconeTitle from "/assets/iconeProfile/flag.png";
import {useTranslation} from "react-i18next";
import {Titles, User} from "../../Interface/Interface.ts";
import React, {useEffect} from "react";
import {getElementByEndpoint, updateUser} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";

interface MyFormProps {
    onClose: () => void;
    infosUserById: User;
}

const MyForm: React.FC<MyFormProps> = ({onClose, infosUserById}) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();

    useEffect(() => {
        // Désactive le défilement lorsque le formulaire est ouvert
        document.body.style.overflow = 'hidden';

        // Réactive le défilement lorsque le formulaire est fermé
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    const [titles, setTitles] = React.useState<Titles[]>();
    const getTitles = getElementByEndpoint("user/getTitles", {
        token: authContext.accessToken ?? "",
        data: ''
    });

    const initialValues: User = {
        localisation: infosUserById.localisation ?? '',
        company: infosUserById.company ?? '',
        school: infosUserById.school ?? '',
        github: infosUserById.github ?? '',
        url: infosUserById.url ?? '',
        titlesId: infosUserById.titlesId as unknown as number ?? '',
        lastName: infosUserById.lastName ?? '',
        firstName: infosUserById.firstName ?? '',
    };

    const onSubmit = async (values: User) => {
        const response = await updateUser("user/updateUser", {
            id: infosUserById.id,
            token: authContext.accessToken,
            userName: infosUserById.userName,
            localisation: values.localisation,
            company: values.company,
            school: values.school,
            github: values.github,
            url: values.url,
            lastName: values.lastName,
            firstName: values.firstName,
            titlesId: values.titlesId,
        });

        if (response.ok) {
            onClose(); // Fermer le popup après la soumission réussie
            window.location.reload();
        } else {
            alert("Erreur lors de la mise à jour du profil");
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            firstName: Yup.string(),
            lastName: Yup.string(),
            localisation: Yup.string(),
            company: Yup.string(),
            school: Yup.string(),
            github: Yup.string(),
            url: Yup.string(),
            titlesId: Yup.number(),
        }),
        onSubmit,
    });
    console.log(infosUserById)
    useEffect(() => {
        if (!titles) {
            getTitles.then(async (response) => {
                const result = await response.json();
                const titlesUser = result
                    .filter((title: { id: number; }) => infosUserById?.titlesWin?.includes(String(title.id)))
                    .map((title: { label: string; id: number; }) => ({
                        label: title.label,
                        id: title.id,
                    }));

                setTitles(titlesUser);
            });
        }
    }, []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col w-full mb-10">
                <p className="text-tertiari font-bold text-2xl text-center mb-6">{t("ProfileUpdate")}</p>
                <ul className="flex flex-col mt-5">
                    <li className="flex flex-row mb-2">
                        <p className="font-bold text-tertiari mr-10">{t("firstName")} : </p>
                        <input
                            type="text"
                            id="firstName"
                            className="bg-tertiary text-primary"
                            {...formik.getFieldProps('firstName')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <p className="font-bold text-tertiari mr-5">{t("lastName")} : </p>
                        <input
                            type="text"
                            id="lastName"
                            className="bg-tertiary text-primary"
                            {...formik.getFieldProps('lastName')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <img src={map} alt="map" className="mr-10 ml-6"/>
                        <input
                            type="text"
                            id="localisation"
                            className="bg-tertiary text-primary"
                            {...formik.getFieldProps('localisation')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <img src={company} alt="company" className="mr-10 ml-6"/>
                        <input
                            type="text"
                            id="company"
                            className="bg-tertiary text-primary"
                            {...formik.getFieldProps('company')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <img src={school} alt="school" className="mr-10 ml-6"/>
                        <input
                            type="text"
                            id="school"
                            className="bg-tertiary text-primary"
                            {...formik.getFieldProps('school')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <img src={github} alt="github" className="mr-10 ml-6"/>
                        <input
                            type="text"
                            id="github"
                            className="bg-tertiary text-primary"
                            {...formik.getFieldProps('github')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <img src={link} alt="map" className="mr-10 ml-6"/>
                        <input
                            type="text"
                            id="url"
                            className="bg-tertiary text-primary"
                            {...formik.getFieldProps('url')}
                        />
                    </li>
                    <li className="flex flex-row mb-2">
                        <img src={iconeTitle} alt="titles" className="mr-10 ml-6"/>
                        <select
                            id="titlesId"
                            className="bg-tertiary text-primary"
                            {...formik.getFieldProps('titlesId')}
                        >
                            <option value="" label={t('SelectTitle')}/>
                            {titles?.map((title, index) => (
                                <option key={index} value={title.id as number} label={title.label as string}/>
                            ))}
                        </select>
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
    );
};

export default MyForm;

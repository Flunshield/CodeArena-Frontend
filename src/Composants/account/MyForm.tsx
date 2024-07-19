import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import company from "/assets/icones/company.png";
import github from "/assets/icones/github.png";
import link from "/assets/icones/link.png";
import map from "/assets/icones/map-marker.png";
import school from "/assets/icones/school.png";
import iconeTitle from "/assets/icones/flag.png";
import {useTranslation} from "react-i18next";
import {Titles, User} from "../../Interface/Interface.ts";

import {getElementByEndpoint, updateUser} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import { Container } from '../../ComposantsCommun/Container.tsx';
import { FadeIn } from '../../ComposantsCommun/FadeIn.tsx';
import {CODE_LANGUAGES_FAVORITES} from "../../constantes/constantes.ts";

interface MyFormProps {
    onClose: () => void;
    infosUserById: User;
    setIsSubmitted: () => void;
}

const MyForm: React.FC<MyFormProps> = ({onClose, infosUserById, setIsSubmitted}) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
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
        languagePreference: infosUserById.languagePreference ?? '',
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
            languagePreference: values.languagePreference,
        });

        if (response.ok) {
            onClose();
            setIsSubmitted();
        } else {
            alert('Erreur lors de la mise à jour du profil');
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
            languagePreference: Yup.string(),
        }),
        onSubmit,
    });

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
        <Container>
            <FadeIn>
                <form 
                    onSubmit={formik.handleSubmit} 
                    className="p-6 bg-quaternary text-tertiari rounded-lg shadow-lg max-w-lg mx-auto animate-fade-in"
                >
                    <div className="flex flex-col w-full mb-6">
                        <p className="text-2xl font-bold text-center mb-4">{t('ProfileUpdate')}</p>
                        <ul className="flex flex-col space-y-4">
                            <li className="flex items-center space-x-3">
                                <p className="font-bold">{t('firstName')}:</p>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('firstName')}
                                />
                            </li>
                            <li className="flex items-center space-x-3">
                                <p className="font-bold">{t('lastName')}:</p>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('lastName')}
                                />
                            </li>
                            <li className="flex items-center space-x-3">
                                <img src={map} alt="map" className="w-6 h-6"/>
                                <input
                                    type="text"
                                    id="localisation"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('localisation')}
                                />
                            </li>
                            <li className="flex items-center space-x-3">
                                <img src={company} alt="company" className="w-6 h-6"/>
                                <input
                                    type="text"
                                    id="company"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('company')}
                                />
                            </li>
                            <li className="flex items-center space-x-3">
                                <img src={school} alt="school" className="w-6 h-6"/>
                                <input
                                    type="text"
                                    id="school"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('school')}
                                />
                            </li>
                            <li className="flex items-center space-x-3">
                                <img src={github} alt="github" className="w-6 h-6"/>
                                <input
                                    type="text"
                                    id="github"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('github')}
                                />
                            </li>
                            <li className="flex items-center space-x-3">
                                <img src={link} alt="url" className="w-6 h-6"/>
                                <input
                                    type="text"
                                    id="url"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('url')}
                                />
                            </li>
                            <li className="flex items-center space-x-3">
                                <img src={iconeTitle} alt="titles" className="w-6 h-6"/>
                                <select
                                    id="titlesId"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('titlesId')}
                                >
                                    <option value="" label={t('SelectTitle')}/>
                                    {titles?.map((title, index) => (
                                        <option key={index} value={title.id} label={title.label}/>
                                    ))}
                                </select>
                            </li>
                            <li className="flex items-center space-x-3">
                                <p className="font-bold">&lt;/&gt;</p>
                                <select
                                    id="languagePreference"
                                    className="w-full p-2 bg-neutral-50 text-neutral-900 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    {...formik.getFieldProps('languagePreference')}
                                >
                                    <option value="" label={t('PrefCode')}/>
                                    {CODE_LANGUAGES_FAVORITES?.map((languagePreference, index) => (
                                        <option key={index} value={languagePreference} label={languagePreference}/>
                                    ))}
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between">
                        <button type="submit"
                                className="px-4 py-2 bg-primary text-tertiari rounded-lg shadow-md transition duration-300 hover:bg-primary-dark">
                            {t('update')}
                        </button>
                        <button type="button" onClick={onClose}
                                className="px-4 py-2 bg-gray-700 text-tertiari rounded-lg shadow-md transition duration-300 hover:bg-gray-800">
                            {t('close')}
                        </button>
                    </div>
                </form>
            </FadeIn>
        </Container>
    );
};

export default MyForm;

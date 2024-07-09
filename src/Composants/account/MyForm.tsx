import { useFormik } from 'formik';
import * as Yup from 'yup';
import company from '/assets/iconeProfile/company.png';
import github from '/assets/iconeProfile/github.png';
import link from '/assets/iconeProfile/link.png';
import map from '/assets/iconeProfile/map-marker.png';
import school from '/assets/iconeProfile/school.png';
import iconeTitle from '/assets/iconeProfile/flag.png';
import { useTranslation } from 'react-i18next';
import { DataToken, Titles, User } from '../../Interface/Interface.ts';
import React, { useEffect, useState } from 'react';
import { getElementByEndpoint, updateUser } from '../../Helpers/apiHelper.ts';
import { JwtPayload } from 'jwt-decode';
import { useAuthContext } from '../../AuthContext.tsx';

interface MyFormProps {
    onClose: () => void;
    infosUserById: User;
}

const MyForm: React.FC<MyFormProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const authContext = useAuthContext();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    const infosUser: JwtPayload = authContext?.infosUser as JwtPayload;
    const infos: DataToken = infosUser.aud as unknown as DataToken;
    const [titles, setTitles] = useState<Titles[]>();
    
    useEffect(() => {
        if (!titles) {
            getElementByEndpoint('user/getTitles', {
                token: authContext.accessToken ?? '',
                data: '',
            }).then(async (response) => {
                const result = await response.json();
                const titlesUser = result
                    .filter((title: { id: number }) => infos?.data?.titlesWin?.includes(String(title.id)))
                    .map((title: { label: string; id: number }) => ({
                        label: title.label,
                        id: title.id,
                    }));
                setTitles(titlesUser);
            });
        }
    }, [titles]);

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
        const response = await updateUser('user/updateUser', {
            id: infos.data.id,
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
            onClose();
            window.location.reload();
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
        }),
        onSubmit,
    });

    return (
        <form 
            onSubmit={formik.handleSubmit} 
            className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-lg mx-auto animate-fade-in"
        >
            <div className="flex flex-col w-full mb-6">
                <p className="text-2xl font-bold text-center mb-4">{t('ProfileUpdate')}</p>
                <ul className="flex flex-col space-y-4">
                    <li className="flex items-center space-x-3">
                        <p className="font-bold">{t('firstName')}:</p>
                        <input
                            type="text"
                            id="firstName"
                            className="w-full p-2 bg-gray-800 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            {...formik.getFieldProps('firstName')}
                        />
                    </li>
                    <li className="flex items-center space-x-3">
                        <p className="font-bold">{t('lastName')}:</p>
                        <input
                            type="text"
                            id="lastName"
                            className="w-full p-2 bg-gray-800 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            {...formik.getFieldProps('lastName')}
                        />
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={map} alt="map" className="w-6 h-6" />
                        <input
                            type="text"
                            id="localisation"
                            className="w-full p-2 bg-gray-800 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            {...formik.getFieldProps('localisation')}
                        />
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={company} alt="company" className="w-6 h-6" />
                        <input
                            type="text"
                            id="company"
                            className="w-full p-2 bg-gray-800 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            {...formik.getFieldProps('company')}
                        />
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={school} alt="school" className="w-6 h-6" />
                        <input
                            type="text"
                            id="school"
                            className="w-full p-2 bg-gray-800 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            {...formik.getFieldProps('school')}
                        />
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={github} alt="github" className="w-6 h-6" />
                        <input
                            type="text"
                            id="github"
                            className="w-full p-2 bg-gray-800 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            {...formik.getFieldProps('github')}
                        />
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={link} alt="url" className="w-6 h-6" />
                        <input
                            type="text"
                            id="url"
                            className="w-full p-2 bg-gray-800 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            {...formik.getFieldProps('url')}
                        />
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={iconeTitle} alt="titles" className="w-6 h-6" />
                        <select
                            id="titlesId"
                            className="w-full p-2 bg-gray-800 text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            {...formik.getFieldProps('titlesId')}
                        >
                            <option value="" label={t('SelectTitle')} />
                            {titles?.map((title, index) => (
                                <option key={index} value={title.id} label={title.label} />
                            ))}
                        </select>
                    </li>
                </ul>
            </div>
            <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                    {t('update')}
                </button>
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition">
                    {t('close')}
                </button>
            </div>
        </form>
    );
};

export default MyForm;

import React, {useState} from 'react';
import {CVFormState, User} from "../../Interface/Interface.ts";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {useTranslation} from "react-i18next";

interface CVFormProps {
    infosUserById: User;
    closePopup: () => void;
    setShowNotification: (value: boolean) => void;
    setNotificationType: (value: string) => void;
    setNotificationMessage: (value: string) => void;
    setIsSubmitted: () => void;
}

const CVForm = ({
                    infosUserById,
                    closePopup,
                    setNotificationType,
                    setShowNotification,
                    setNotificationMessage,
                    setIsSubmitted
                }: CVFormProps) => {
    const authContext = useAuthContext();
    const {t} = useTranslation();
    const [formData, setFormData] = useState<CVFormState>({
        id: infosUserById.id ?? 0,
        cvName: '',
        firstName: infosUserById.firstName ?? "",
        lastName: infosUserById.lastName ?? "",
        email: infosUserById.email ?? "",
        phone: '',
        address: '',
        summary: '',
        experiences: [{company: '', position: '', startDate: '', endDate: '', description: ''}],
        educations: [{institution: '', degree: '', startDate: '', endDate: '', description: ''}],
        technicalSkills: [{name: ''}],
        softSkills: [{name: ''}]
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        section: 'experiences' | 'educations' | 'technicalSkills' | 'softSkills' | null = null,
        index: number | null = null
    ) => {
        const {name, value} = e.target;
        if (section && index !== null) {
            const updatedSection = formData[section].map((item, i) =>
                i === index ? {...item, [name]: value} : item
            );
            setFormData({...formData, [section]: updatedSection});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const addSection = (section: 'experiences' | 'educations' | 'technicalSkills' | 'softSkills') => {
        const newSection =
            section === 'experiences'
                ? {company: '', position: '', startDate: '', endDate: '', description: ''}
                : section === 'educations'
                    ? {institution: '', degree: '', startDate: '', endDate: '', description: ''}
                    : {name: ''};

        setFormData({...formData, [section]: [...formData[section], newSection]});
    };

    const removeSection = (section: 'experiences' | 'educations' | 'technicalSkills' | 'softSkills', index: number) => {
        const updatedSection = formData[section].filter((_, i) => i !== index);
        setFormData({...formData, [section]: updatedSection});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const sendElement = await postElementByEndpoint('user/createCv', {
            token: authContext.accessToken ?? "",
            data: formData
        });
        if (sendElement.status === 201) {
            closePopup();
            setIsSubmitted();
            setNotificationMessage(t('cvCreated'));
            setNotificationType('success');
            setShowNotification(true);
        } else {
            setNotificationMessage(t('errorCvCreated'));
            setNotificationType('error');
            setShowNotification(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-tertiari shadow-md rounded-md space-y-6">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">{t('cvName')}</h2>
                    <label htmlFor="cvName" className="block text-gray-700">{t('cvName')}</label>
                    <input
                        type="text"
                        id="cvName"
                        name="cvName"
                        value={formData.cvName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        maxLength={25}
                    />
                <h2 className="text-xl font-semibold text-gray-700">{t('personalInformation')}</h2>
                <div>
                    <label htmlFor="firstName" className="block text-gray-700">{t('firstName')}</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-gray-700">{t('lastName')}</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700">{t('email')}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-gray-700">{t('phone')}</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-gray-700">{t('adresse')}</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">{t('resume')}</h2>
                <div>
                    <label htmlFor="summary" className="block text-gray-700">{t('resume')}</label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">{t('experienceProffesional')}</h2>
                {formData.experiences.map((experience, index) => (
                    <div key={index} className="space-y-2">
                        <div>
                            <label htmlFor={`company-${index}`}
                                   className="block text-gray-700">{t('entreprise')}</label>
                            <input
                                type="text"
                                id={`company-${index}`}
                                name="company"
                                value={experience.company}
                                onChange={(e) => handleChange(e, 'experiences', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor={`position-${index}`} className="block text-gray-700">{t('position')}</label>
                            <input
                                type="text"
                                id={`position-${index}`}
                                name="position"
                                value={experience.position}
                                onChange={(e) => handleChange(e, 'experiences', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor={`startDate-${index}`}
                                   className="block text-gray-700">{t('dateDebut')}</label>
                            <input
                                type="date"
                                id={`startDate-${index}`}
                                name="startDate"
                                value={experience.startDate}
                                onChange={(e) => handleChange(e, 'experiences', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor={`endDate-${index}`} className="block text-gray-700">{t('dateFin')}</label>
                            <input
                                type="date"
                                id={`endDate-${index}`}
                                name="endDate"
                                value={experience.endDate}
                                onChange={(e) => handleChange(e, 'experiences', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor={`description-${index}`}
                                   className="block text-gray-700">{t('description')}</label>
                            <textarea
                                id={`description-${index}`}
                                name="description"
                                value={experience.description}
                                onChange={(e) => handleChange(e, 'experiences', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex justify-center w-full">
                            <button
                                type="button"
                                onClick={() => removeSection('experiences', index)}
                                className="mt-2 px-4 py-2 bg-red-500 text-tertiari rounded-md"
                            >
                                {t('deleteThisExperience')}
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center w-full">
                    <button
                        type="button"
                        onClick={() => addSection('experiences')}
                        className="mt-2 px-4 py-2 bg-blue-500 text-tertiari rounded-md"
                    >
                        {t('addExperience')}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">{t('education')}</h2>
                {formData.educations.map((education, index) => (
                    <div key={index} className="space-y-2">
                        <div>
                            <label htmlFor={`institution-${index}`}
                                   className="block text-gray-700">{t('institution')}</label>
                            <input
                                type="text"
                                id={`institution-${index}`}
                                name="institution"
                                value={education.institution}
                                onChange={(e) => handleChange(e, 'educations', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor={`degree-${index}`} className="block text-gray-700">{t('diplome')}</label>
                            <input
                                type="text"
                                id={`degree-${index}`}
                                name="degree"
                                value={education.degree}
                                onChange={(e) => handleChange(e, 'educations', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor={`startDateEducation-${index}`}
                                   className="block text-gray-700">{t('dateDebut')}</label>
                            <input
                                type="date"
                                id={`startDateEducation-${index}`}
                                name="startDate"
                                value={education.startDate}
                                onChange={(e) => handleChange(e, 'educations', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor={`endDateEducation-${index}`}
                                   className="block text-gray-700">{t('dateFin')}</label>
                            <input
                                type="date"
                                id={`endDateEducation-${index}`}
                                name="endDate"
                                value={education.endDate}
                                onChange={(e) => handleChange(e, 'educations', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor={`descriptionEducation-${index}`}
                                   className="block text-gray-700">{t('description')}</label>
                            <textarea
                                id={`descriptionEducation-${index}`}
                                name="description"
                                value={education.description}
                                onChange={(e) => handleChange(e, 'educations', index)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex justify-center w-full">
                            <button
                                type="button"
                                onClick={() => removeSection('educations', index)}
                                className="mt-2 px-4 py-2 bg-red-500 text-tertiari rounded-md"
                            >
                                {t('deleteThisDiplome')}
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center w-full">
                    <button
                        type="button"
                        onClick={() => addSection('educations')}
                        className="mt-2 px-4 py-2 bg-blue-500 text-tertiari rounded-md"
                    >
                        {t('addDiplome')}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">{t('competences')}</h2>
                <h3 className="text-lg font-semibold text-gray-700">{t('competenceTechniques')}</h3>
                {formData.technicalSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                        <div>
                            <label htmlFor={`technicalSkill-${index}`}
                                   className="block text-gray-700">{t('competence')} n°{index + 1}</label>
                            <div className="flex justify-center align-baseline space-x-2 mt-1">
                                <input
                                    type="text"
                                    id={`technicalSkill-${index}`}
                                    name="name"
                                    value={skill.name}
                                    onChange={(e) => handleChange(e, 'technicalSkills', index)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    maxLength={50}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSection('technicalSkills', index)}
                                    className="px-4 py-2 bg-red-500 text-tertiari rounded-md"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center w-full">
                    <button
                        type="button"
                        onClick={() => addSection('technicalSkills')}
                        className="mt-2 px-4 py-2 bg-blue-500 text-tertiari rounded-md"
                    >
                        {t('addCompetence')}
                    </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-700">{t('softSkills')}</h3>
                {formData.softSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                        <div>
                            <label htmlFor={`softSkill-${index}`}
                                   className="block text-gray-700">{t('competence')} n°{index + 1}</label>
                            <div className="flex justify-center align-baseline space-x-2 mt-1">
                                <input
                                    type="text"
                                    id={`softSkill-${index}`}
                                    name="name"
                                    value={skill.name}
                                    onChange={(e) => handleChange(e, 'softSkills', index)}
                                    className=" block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    maxLength={50}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSection('softSkills', index)}
                                    className="px-4 py-2 bg-red-500 text-tertiari rounded-md"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center w-full">
                    <button
                        type="button"
                        onClick={() => addSection('softSkills')}
                        className="mt-2 px-4 py-2 bg-blue-500 text-tertiari rounded-md"
                    >
                        {t('addCompetence')}
                    </button>
                </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-tertiari py-2 px-4 rounded-md">{t('send')}</button>
        </form>
    );
};

export default CVForm;

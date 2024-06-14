import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import { shortUser } from "../Interface/Interface.ts";
import { createUser } from "../Helpers/apiHelper.ts";
import Layout from "../ComposantsCommun/Layout.tsx";
import CardContent from '../ComposantsCommun/CardContent.tsx';
import Card from '../ComposantsCommun/Card.tsx';
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Button from "../ComposantsCommun/Button.tsx";
import Notification from "../ComposantsCommun/Notification.tsx";
import { useNavigate } from "react-router-dom";
import { FadeIn } from '../ComposantsCommun/FadeIn.tsx';

// Interface pour définir la structure des données du formulaire
interface SignUpFormValues {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    github: string;
    portfolio: string;
}

function SignUpForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const allowedDomains = ['gmail.com', 'gmail.fr', 'yahoo.com', 'yahoo.fr', 'hotmail.com', 'hotmail.fr', 'outlook.fr', 'outlook.com'];
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleSubmit = async (values: SignUpFormValues) => {
        const data: shortUser = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            password: values.password,
            email: values.email,
            github: values.github,
            portfolio: values.portfolio,
        }

        try {
            const response = await createUser('user/createUser', data);

            if (response.status === 201) {
                setNotificationMessage(t('mailConfirmMail'));
                setNotificationType('success');
                setShowNotification(true);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else if (response.status === 400) {
                setNotificationMessage(t('mailOrUserNameExist'));
                setNotificationType('error');
                setShowNotification(true);
            }
        } catch (error) {
            console.error("Error during user creation:", error);
            setNotificationMessage(t('errorOccurred'));
            setNotificationType('error');
            setShowNotification(true);
        }
    };

    const validateEmail = (email: string) => {
        const domain = email.split('@')[1]; // Récupère le domaine de l'e-mail
        return allowedDomains.includes(domain);
    };

    return (
        <Layout >
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <FadeIn duration={1.0}>
            <div className="flex justify-center">
                <Card className="rounded-xl w-full md:w-3/4 lg:w-1/2 mt-12">
                    <CardContent className="bg-tertiari text-tertiari w-full pb-6 pt-6">
                        <div className="mb-6 text-center">
                            <p className="text-3xl text-secondary font-bold">{t('signUp')}</p>
                        </div>
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                userName: '',
                                password: '',
                                email: '',
                                github: '',
                                portfolio: ''
                            }}
                            validate={(values) => {
                                const errors: Partial<SignUpFormValues> = {};
                                const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                                // Validation des champs
                                if (!values.firstName) {
                                    errors.firstName = t('fieldRequired');
                                }
                                if (!values.lastName) {
                                    errors.lastName = t('fieldRequired');
                                }
                                if (!values.userName) {
                                    errors.userName = t('fieldRequired');
                                }
                                if (!values.password) {
                                    errors.password = t('fieldRequired');
                                } else if (!regexPassword.test(values.password)) {
                                    errors.password = t('invalidPassword');
                                }
                                if (!values.email) {
                                    errors.email = t('fieldRequired');
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                    errors.email = t('invalidEmail');
                                } else if (!validateEmail(values.email)) {
                                    errors.email = t('invalidEmailDomain');
                                }

                                return errors;
                            }}
                            onSubmit={handleSubmit}
                        >
                            <FadeIn duration={2.0}>
                            <Form className="px-6">
                                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-4">
                                    <div>
                                        <Label id="firstName" htmlFor="firstName" className="font-bold">{t('firstName')}</Label>
                                        <Field type="text" id="firstName" name="firstName" placeholder={t('firstName')} className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")} />
                                        <ErrorMessage name="firstName" component="div" className="text-error" />
                                    </div>
                                    <div>
                                        <Label id="lastName" htmlFor="lastName" className="font-bold">{t('lastName')}</Label>
                                        <Field type="text" id="lastName" name="lastName" placeholder={t('lastName')} className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")} />
                                        <ErrorMessage name="lastName" component="div" className="text-error" />
                                    </div>
                                    <div>
                                        <Label id="userName" htmlFor="userName" className="font-bold">{t('userName')}</Label>
                                        <Field type="text" id="userName" name="userName" placeholder={t('userName')} className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")} />
                                        <ErrorMessage name="userName" component="div" className="text-error" />
                                    </div>
                                    <div>
                                        <Label id="password" htmlFor="password" className="font-bold">{t('password')}</Label>
                                        <Field type="password" id="password" name="password" placeholder={t('password')} className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")} />
                                        <ErrorMessage name="password" component="div" className="text-error" />
                                    </div>
                                    <div>
                                        <Label id="email" htmlFor="email" className="font-bold">{t('email')}</Label>
                                        <Field type="email" id="email" name="email" placeholder={t('email')} className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")} />
                                        <ErrorMessage name="email" component="div" className="text-error" />
                                    </div>

                                    <div>
                                        <Label id="github" htmlFor="github" className="font-bold">{t('Lien Github')}</Label>
                                        <Field type="text" id="github" name="github" placeholder={t('github')} className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")} />
                                        <ErrorMessage name="github" component="div" className="text-error" />
                                    </div>
                                    <div>
                                        <Label id="SiteWeb" htmlFor="SiteWeb" className="font-bold">{t('Site Web')}</Label>
                                        <Field type="text" id="portfolio" name="portfolio" placeholder={t('Site Web')} className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")} />
                                        <ErrorMessage name="portfolio" component="div" className="text-error" />
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Button type="submit" id="createAccount" className="bg-gray-700 text-tertiari p-2 md:px-4 py-2 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 w-full">
                                        {t('register')}
                                    </Button>
                                </div>
                            </Form>
                            </FadeIn>
                        </Formik>
                        <div className="mt-4 text-left">
                            <div className="flex flex-col mt-5">
                                <a href="/login" className="text-left text-primary hover:underline">
                                {t('Déjà un compte')}
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </FadeIn>
        </Layout>
    );
}

export default SignUpForm;
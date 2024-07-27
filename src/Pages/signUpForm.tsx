import {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import {shortUser} from "../Interface/Interface.ts";
import {createUser} from "../Helpers/apiHelper.ts";
import Layout from "../ComposantsCommun/Layout.tsx";
import CardContent from '../ComposantsCommun/CardContent.tsx';
import Card from '../ComposantsCommun/Card.tsx';
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Button from "../ComposantsCommun/Button.tsx";
import Notification from "../ComposantsCommun/Notification.tsx";
import {useNavigate} from "react-router-dom";
import {FadeIn, FadeInStagger} from '../ComposantsCommun/FadeIn.tsx';
import {Container} from "../ComposantsCommun/Container.tsx";
import {SectionIntro} from '../ComposantsCommun/SectionIntro.tsx';

// Interface pour définir la structure des données du formulaire
interface SignUpFormValues {
    userName: string;
    password: string;
    email: string;
}

function SignUpForm() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const allowedDomains = ['gmail.com', 'gmail.fr', 'yahoo.com', 'yahoo.fr', 'hotmail.com', 'hotmail.fr', 'outlook.fr', 'outlook.com'];
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async (values: SignUpFormValues) => {
        const data: shortUser = {
            userName: values.userName,
            password: values.password,
            email: values.email
        };
        const response = await createUser('user/creatUser', data);
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
    };

    const validateEmail = (email: string) => {
        const domain = email.split('@')[1];
        return allowedDomains.includes(domain);
    };

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <Layout classnameMain="mt-16 sm:mt-1">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <Container className="flex flex-col items-center justify-center min-h-screen py-12">
                <FadeIn className="w-full max-w-md">
                    <Card className="rounded-xl shadow-lg">
                        <CardContent className=" text-secondary w-full pb-6 pt-6">
                            <SectionIntro
                                title={t('signUp')}
                                className="mb-12 text-center"
                            >
                            </SectionIntro>
                            <Formik
                                initialValues={{userName: '', password: '', email: ''}}
                                validate={(values) => {
                                    const errors: Partial<SignUpFormValues> = {};
                                    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                                    if (!values.userName) {
                                        errors.userName = 'Ce champ est requis';
                                    }
                                    if (!values.password) {
                                        errors.password = 'Ce champ est requis';
                                    } else if (!regexPassword.test(values.password)) {
                                        errors.password = t('invalidPassword');
                                    }
                                    if (!values.email) {
                                        errors.email = 'Ce champ est requis';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                        errors.email = 'Adresse e-mail invalide';
                                    } else if (!validateEmail(values.email)) {
                                        errors.email = t('invalidEmailDomain');
                                    }

                                    return errors;
                                }}
                                onSubmit={handleSubmit}
                            >
                                <Form className="space-y-6" id='createAccount'>
                                    <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <FadeIn duration={1.6}>
                                            <Label id='userName' htmlFor="userName"
                                                   className="flex flex-col font-bold text-secondary">
                                                {t('userName')}
                                                <Field
                                                    type="text"
                                                    id="userName"
                                                    name="userName"
                                                    placeholder={t('userName')}
                                                    className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")}
                                                />
                                                <ErrorMessage name="userName" component="div" className="text-error"/>
                                            </Label>
                                        </FadeIn>
                                        <FadeIn duration={1.9}>
                                            <Label id='password' htmlFor="password"
                                                   className="flex flex-col font-bold text-secondary">
                                                {t('password')}
                                                <div className="relative">
                                                    <Field
                                                        type={showPassword ? 'text' : 'password'}
                                                        id="password"
                                                        name="password"
                                                        placeholder={t('password')}
                                                        className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={toggleShowPassword}
                                                        className="absolute inset-y-0 right-0 px-3 py-1"
                                                        aria-label={showPassword ? t('Hide password') : t('Show password')}
                                                    >
                                                        {showPassword ? (
                                                            <svg
                                                                className="w-6 h-6 text-gray-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 3 12 3a10.05 10.05 0 011.875.175M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19.071 19.071l-2.828-2.828M4.929 4.929l2.828 2.828"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                className="w-6 h-6 text-gray-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M2.458 12C3.732 7.943 7.455 5 12 5c4.546 0 8.268 2.943 9.542 7-.846 2.81-3.016 5.062-5.741 6.234M12 5c4.546 0 8.268 2.943 9.542 7"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                                <ErrorMessage name="password" component="div" className="text-error"/>
                                            </Label>
                                        </FadeIn>
                                        <FadeIn duration={2.2}>
                                            <Label id='email' htmlFor="email"
                                                   className="flex flex-col font-bold text-secondary">
                                                {t('email')}
                                                <Field
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder={t('email')}
                                                    className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-secondary")}
                                                />
                                                <ErrorMessage name="email" component="div" className="text-error"/>
                                            </Label>
                                        </FadeIn>
                                    </FadeInStagger>
                                    <div className="flex flex-col justify-center mt-10">
                                        <Button id='submitButton' type="submit"
                                                className="bg-secondary hover:bg-button-hover text-tertiari w-full h-12 rounded-md uppercase">
                                            {t('register')}
                                        </Button>
                                        <div className="text-center mt-5">
                                            <Button type="button" id="goToLogin"
                                                    className="hover:text-cyan-800 text-secondary" onClick={goToLogin}>
                                                {t('signIntoCodeArena')}
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </CardContent>
                    </Card>
                </FadeIn>
            </Container>
        </Layout>
    );
}

export default SignUpForm;

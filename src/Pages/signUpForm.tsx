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
import { FadeIn, FadeInStagger } from '../ComposantsCommun/FadeIn.tsx';
import { Container } from "../ComposantsCommun/Container.tsx";
import { SectionIntro } from '../ComposantsCommun/SectionIntro.tsx';
import ButtonVisible from '../ComposantsCommun/buttonVisible.tsx';

// Interface pour définir la structure des données du formulaire
interface SignUpFormValues {
    userName: string;
    password: string;
    email: string;
}

function SignUpForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
                    <Card className="shadow-lg rounded-xl">
                        <CardContent className="w-full pt-6 pb-6 text-secondary">
                            <SectionIntro
                                title={t('signUp')}
                                className="mb-12 text-center"
                            >
                            </SectionIntro>
                            <Formik
                                initialValues={{ userName: '', password: '', email: '' }}
                                validate={(values) => {
                                    const errors: Partial<SignUpFormValues> = {};
                                    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                                    const regexUsername = /^[a-zA-Z0-9_]{3,30}$/;

                                    if (!values.userName) {
                                        errors.userName = t('requiredField');
                                    } else if (!regexUsername.test(values.userName)) {
                                        errors.userName = t('invalidUserName');
                                    }
                                    if (!values.password) {
                                        errors.password = 'Ce champ est requis';
                                    } else if (!regexPassword.test(values.password)) {
                                        errors.password = t('invalidPassword');
                                    }
                                    if (!values.email) {
                                        errors.email = 'Ce champ est requis';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                        errors.email = t('invalidEmailDomain');
                                    }

                                    return errors;
                                }}
                                onSubmit={handleSubmit}
                            >
                                <Form className="space-y-6" id='createAccount'>
                                    <FadeInStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                                                <ErrorMessage name="userName" component="div" className="text-error" />
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
                                                    <ButtonVisible
                                                        isVisible={showPassword}
                                                        onToggle={toggleShowPassword}
                                                        ariaLabel={showPassword ? t('Hide password') : t('Show password')}
                                                    />
                                                </div>
                                                <ErrorMessage name="password" component="div" className="text-error" />
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
                                                <ErrorMessage name="email" component="div" className="text-error" />
                                            </Label>
                                        </FadeIn>
                                    </FadeInStagger>
                                    <div className="flex flex-col justify-center mt-10">
                                        <Button id='submitButton' type="submit"
                                            className="w-full h-12 uppercase rounded-md bg-secondary hover:bg-button-hover text-tertiari">
                                            {t('register')}
                                        </Button>
                                        <div className="mt-5 text-center">
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

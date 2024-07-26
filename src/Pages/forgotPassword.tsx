import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import { forgotPassword } from "../Helpers/apiHelper.ts";
import { useNavigate } from "react-router-dom";
import Layout from "../ComposantsCommun/Layout.tsx";
import CardContent from '../ComposantsCommun/CardContent.tsx';
import Card from '../ComposantsCommun/Card.tsx';
import { useTranslation } from "react-i18next";
import Button from "../ComposantsCommun/Button.tsx";
import Notification from "../ComposantsCommun/Notification.tsx";
import { FadeIn, FadeInStagger } from '../ComposantsCommun/FadeIn.tsx';
import { Container } from "../ComposantsCommun/Container.tsx";
import { SectionIntro } from '../ComposantsCommun/SectionIntro.tsx';

interface SignUpFormValues {
    email: string;
}

function ForgotPassword() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleSubmit = async (value: SignUpFormValues) => {
        const response = await forgotPassword('auth/forgotPassWord', value.email)
        if (response.status === 201) {
            setNotificationMessage(t("resetPasswordEmailSent"));
            setNotificationType('success');
            setShowNotification(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else {
            setNotificationMessage(t("errorOccurred"));
            setNotificationType('error');
            setShowNotification(true);
        }
    };

    return (
        <Layout classnameMain="sm:mt-1">
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
                        <CardContent className="text-secondary w-full pb-6 pt-6">
                            <SectionIntro
                                title={t('forgotPasswordTitle')}
                                className="mb-12 text-center"
                            />
                            <Formik
                                initialValues={{ email: '' }}
                                validate={(values) => {
                                    const errors: Partial<SignUpFormValues> = {};
                                    if (!values.email) {
                                        errors.email = t('requiredField');
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                        errors.email = t('invalidEmail');
                                    }
                                    return errors;
                                }}
                                onSubmit={handleSubmit}
                            >
                                <Form className="space-y-6">
                                    <FadeInStagger>
                                        <FadeIn duration={1}>
                                            <Label id='email' htmlFor="email" className="flex flex-col font-bold text-secondary">
                                                {t('email')}
                                                <Field
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder={t('email')}
                                                    className="h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"
                                                />
                                                <ErrorMessage id='email' name="email" component="div" className="text-error" />
                                            </Label>
                                        </FadeIn>
                                    </FadeInStagger>
                                    <div className="flex flex-col justify-center mt-10">
                                        <Button id='submit' type="submit" className="bg-secondary text-tertiari w-full h-12 rounded-md uppercase">
                                            {t('submitRequest')}
                                        </Button>
                                    </div>
                                    <div className="flex ">
                                        <a href="/login" className="text-center hover:text-cyan-800 text-secondary">
                                            {t('signIntoCodeArena')}
                                        </a>
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

export default ForgotPassword;

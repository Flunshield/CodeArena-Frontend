import {useState} from 'react';
import {Field, Form, Formik} from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import {forgotPassword} from "../Helpers/apiHelper.ts";
import {useNavigate} from "react-router-dom";
import Layout from "../ComposantsCommun/Layout.tsx";
import tree from "/assets/tree.svg";
import CardContent from '../ComposantsCommun/CardContent.tsx';
import Card from '../ComposantsCommun/Card.tsx';
import {useTranslation} from "react-i18next";
import Button from "../ComposantsCommun/Button.tsx";
import Notification from "../ComposantsCommun/Notification.tsx";

interface SignUpFormValues {
    email: string;
}

function ForgotPassword() {
    const navigate = useNavigate();
    const error: string = "";
    const {t} = useTranslation();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleSubmit = async (value: SignUpFormValues) => {
        const test = await forgotPassword('auth/forgotPassWord', value.email)
        console.log(test)
        if (test.status === 201) {
            setNotificationMessage("Un mail pour modifier votre mot de passe a été envoyé");
            setNotificationType('success');
            setShowNotification(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else {
            setNotificationMessage("Une erreur est survenue");
            setNotificationType('error');
            setShowNotification(true);
        }
    };

    return (
        <Layout classnameMain="-mt-32 -mb-0">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="flex flex-row justify-center mt-16">
                <div className="m-5 xl:ml-auto">
                    <Card className="lg:mt-64 mb-32 rounded-none w-full">
                        <CardContent className="bg-tertiari text-tertiari w-full pb-6 pt-6">
                            <div className="mt-2 mb-2">
                                <div className="flex flex-col mb-5 text-center font-bold">
                                    <p className="text-3xl text-primary">{t('forgotPasswordTitle')}</p>
                                    {error && <p className="text-error mt-2">{error}</p>}
                                </div>
                                <Formik
                                    initialValues={{email: ''}}
                                    validate={(values) => {
                                        const errors: Partial<SignUpFormValues> = {};
                                        if (!values.email) {
                                            errors.email = 'Ce champ est requis';
                                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                            errors.email = 'Adresse e-mail invalide';
                                        }

                                        return errors;
                                    }}
                                    onSubmit={handleSubmit}
                                >
                                    <Form className="pr-10 pl-10">
                                        {/* Champ email */}
                                        <div>
                                            <Label htmlFor="email" id={"email"}>Adresse e-mail</Label>
                                            <Field type="email" id="email" name="email"
                                                   className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}/>
                                        </div>
                                        <br/>
                                        {/* Bouton de soumission du formulaire */}
                                        <div className="mt-5">
                                            <Button type="submit" id={"submitRequest"}
                                                    className="bg-secondary w-full h-12 rounded-md uppercase">
                                                {t('submitRequest')}
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <img
                    className="bg-primary ml-auto hidden xl:block"
                    src={tree}
                    alt="arbre design"
                    id="arbre"
                />
            </div>
        </Layout>
    );
}

export default ForgotPassword;

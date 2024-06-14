import {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import {shortUser} from "../Interface/Interface.ts";
import {createUser} from "../Helpers/apiHelper.ts";
import Layout from "../ComposantsCommun/Layout.tsx";
import tree from "/assets/tree.svg";
import CardContent from '../ComposantsCommun/CardContent.tsx';
import Card from '../ComposantsCommun/Card.tsx';
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Button from "../ComposantsCommun/Button.tsx";
import Notification from "../ComposantsCommun/Notification.tsx";
import {useNavigate} from "react-router-dom";

// Interface pour définir la structure des données du formulaire
interface SignUpFormValues {
    userName: string;
    password: string;
    email: string;
}

function SignUpForm () {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const allowedDomains = ['gmail.com', 'gmail.fr', 'yahoo.com', 'yahoo.fr', 'hotmail.com', 'hotmail.fr', 'outlook.fr', 'outlook.com'];
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const handleSubmit = async (values: SignUpFormValues) => {
        const data: shortUser = {
            userName: values.userName,
            password: values.password,
            email: values.email
        }
        const response = await createUser('user/creatUser', data)
        if (response.status === 201) {
            setNotificationMessage(t('mailConfirmMail'));
            setNotificationType('success');
            setShowNotification(true);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } else if (response.status === 400) {
            setNotificationMessage(t('mailOrUserNameExist'));
            setNotificationType('success');
            setShowNotification(true);
        }
    };
    const validateEmail = (email: string) => {
        const domain = email.split('@')[1]; // Récupère le domaine de l'e-mail
        return allowedDomains.includes(domain);
    };

    return (
        <Layout classnameMain="-mt-16">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="flex flex-row justify-around mb-64">
                <Card className="rounded-xl w-96 mt-32 m-5">
                    <CardContent className="bg-tertiari text-tertiari w-full pb-6 pt-6">
                        <div className="mt-2 mb-2">
                            <div className="flex flex-col mb-5 text-center font-bold">
                                <p className="text-3xl text-primary">{t('signUp')}</p>
                            </div>
                            <Formik
                                initialValues={{userName: '', password: '', email: ''}}
                                validate={(values) => {
                                    const errors: Partial<SignUpFormValues> = {};
                                    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                                    // Validation des champs
                                    if (!values.userName) {
                                        errors.userName = 'Ce champ est requis';
                                    }
                                    if (!values.password) {
                                        errors.password = 'Ce champ est requis';
                                    } else if (!regexPassword.test(values.password)) {
                                        errors.password = 'Mot de passe invalide. Il doit contenir au moins une lettre minuscule, ' +
                                            'une lettre majuscule, un chiffre, un caractère spécial et faire au moins 8 caractères.';
                                    }
                                    if (!values.email) {
                                        errors.email = 'Ce champ est requis';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                        errors.email = 'Adresse e-mail invalide';
                                    } else if (!validateEmail(values.email)) {
                                        errors.email = 'Domaine de l\'adresse e-mail non autorisé';
                                    }

                                    return errors;
                                }}
                                onSubmit={handleSubmit}
                            >
                                <Form className="pr-10 pl-10">
                                    <div>
                                        <Label htmlFor="userName" id={"userNameLabel"}
                                               className="flex flex-col font-bold text-primary">{t('userName')}</Label>
                                        <Field type="text" id="userName" name="userName" placeholder={t('userName')}
                                               className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary")}/>
                                        <ErrorMessage name="userName" component="div" className="text-error"/>
                                    </div>
                                    <br/>

                                    {/* Champ password */}
                                    <div>
                                        <Label htmlFor="password" id={"passwordLabel"}>{t('password')}</Label>
                                        <Field type="password" id="password" name="password" placeholder={t('password')}
                                               className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}/>
                                        <ErrorMessage name="password" component="div"
                                                      className="text-error text-justify"/>
                                    </div>
                                    <br/>

                                    {/* Champ email */}
                                    <div>
                                        <Label htmlFor="email" id={"emailLabel"}>{t('email')}</Label>
                                        <Field type="email" id="email" name="email" placeholder={t('email')}
                                               className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}/>
                                        <ErrorMessage name="email" component="div"
                                                      className="text-error text-justify"/>
                                    </div>
                                    <br/>

                                    {/* Bouton de soumission du formulaire */}
                                    <div className="mt-5">
                                        <Button type="submit" id={"createAccount"}
                                                className="bg-secondary w-full h-12 rounded-md uppercase">
                                            {t('register')}
                                        </Button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </CardContent>
                </Card>
                <img
                    className="bg-primary ml-auto hidden xl:block absolute right-0 -z-10"
                    src={tree}
                    alt="arbre design"
                    id="arbre"
                />
            </div>
        </Layout>
    );
}

export default SignUpForm;

// Importez les dépendances nécessaires
import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import {shortUser} from "../Interface/Interface.ts";
import {createUser} from "../Helpers/apiHelper.ts";
import {useNavigate} from "react-router-dom";
import Layout from "../ComposantsCommun/Layout.tsx";
import tree from "/assets/tree.svg";
import CardContent from '../ComposantsCommun/CardContent.tsx';
import Card from '../ComposantsCommun/Card.tsx';
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Button from "../ComposantsCommun/Button.tsx";

// Interface pour définir la structure des données du formulaire
interface SignUpFormValues {
    userName: string;
    password: string;
    email: string;
}

// Composant fonctionnel SignUpForm
const SignUpForm: React.FC = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("")
    const {t} = useTranslation();
    const handleSubmit = async (values: SignUpFormValues) => {
        const data: shortUser = {
            userName: values.userName,
            password: values.password,
            email: values.email
        }
        const response = await createUser('user/creatUser', data)
        if (response.status === 201) {
            window.alert(t('mailConfirmMail'));
            navigate("/");
        } else if (response.status === 400) {
            setError(t('mailOrUserNameExist'))
        }
    };

    return (
        <Layout>
            <div className="flex flex-row justify-around">
                <div className="relative left-1/3 flex items-center ">
                    <div>
                        <Card className="mt-32 rounded-none w-96">
                            <CardContent className="bg-tertiari text-tertiari w-96 pb-6 pt-6">
                                <div className="mt-2 mb-2">
                                    <div className="flex flex-col mb-5 text-center font-bold">
                                        <p className="text-3xl text-primary">{t('signIntoCodeArena')}</p>
                                        {error && <p className="text-error mt-2">{error}</p>}
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
                                            }

                                            return errors;
                                        }}
                                        onSubmit={handleSubmit}
                                    >
                                        <Form className="pr-10 pl-10">
                                            <div>
                                                <Label htmlFor="userName" id={"userNameLabel"}
                                                       className="flex flex-col font-bold text-primary">{t('userName')}</Label>
                                                <Field type="text" id="userName" name="userName"
                                                       className={clsx("h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary")}/>
                                                <ErrorMessage name="userName" component="div" className="text-error"/>
                                            </div>
                                            <br/>

                                            {/* Champ password */}
                                            <div>
                                                <Label htmlFor="password" id={"passwordLabel"}>{t('password')}</Label>
                                                <Field type="password" id="password" name="password"
                                                       className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}/>
                                                <ErrorMessage name="password" component="div"
                                                              className="text-error text-justify"/>
                                            </div>
                                            <br/>

                                            {/* Champ email */}
                                            <div>
                                                <Label htmlFor="email" id={"emailLabel"}>{t('email')}</Label>
                                                <Field type="email" id="email" name="email"
                                                       className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}/>
                                            </div>
                                            <br/>

                                            {/* Bouton de soumission du formulaire */}
                                            <div className="mt-5">
                                                <Button type="submit" id={"createAccount"}
                                                        className="bg-secondary w-full h-12 rounded-md uppercase">
                                                    {t('createAccount')}
                                                </Button>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <img
                    className="bg-primary ml-auto"
                    src={tree}
                    alt="arbre design"
                    id="arbre"
                />
            </div>
        </Layout>
    );
};

export default SignUpForm;

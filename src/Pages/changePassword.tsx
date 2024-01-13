import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import { changePassword } from "../Helpers/apiHelper.ts";
import {useLocation, useNavigate} from "react-router-dom";
import Layout from "../ComposantsCommun/Layout.tsx";
import tree from "../assets/tree.svg";
import CardContent from '../ComposantsCommun/CardContent.tsx';
import Card from '../ComposantsCommun/Card.tsx';
import { useTranslation } from "react-i18next";
import Button from "../ComposantsCommun/Button.tsx";
import { LoginForm } from "../Interface/Interface.ts";

// Interface pour définir la structure des données du formulaire
interface SignUpFormValues {
    password: string;
    confirmePassword: string;
    errorPassword: string;
}

// Composant fonctionnel ChangePassword
const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const location = useLocation();

    // Récupérez les paramètres de la query string
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userName = params.get('userName');
    const handleSubmit = async (values: SignUpFormValues) => {
        const data: LoginForm = {
            token: token ?? "",
            userName: userName ?? "",
            password: values.password
        };

            const response = await changePassword('auth/changePassword', data);
            if(response.status === 201) {
                window.alert(t('passwordChange'));
                navigate("/");
            } else {
                window.alert(t('tokenchangePasswordExpired'));
                navigate("/");
            }
    };

    return (
        <Layout>
            <div className="flex flex-row justify-around">
                <div className="relative left-1/3 flex items-center ">
                    <div>
                        <Card className="mt-32 rounded-none w-96">
                            <CardContent className="bg-tertiari text-white w-96 pb-6 pt-6">
                                <div className="mt-2 mb-2">
                                    <div className="flex flex-col mb-5 text-center font-bold">
                                        <p className="text-3xl text-primary">{t('forgotPasswordTitle')}</p>
                                    </div>
                                    <Formik
                                        initialValues={{ password: '', confirmePassword: '', errorPassword: '' }}
                                        validate={(values) => {
                                            const errors: Partial<SignUpFormValues> = {};
                                            if (!values.password || !values.confirmePassword) {
                                                if(!values.password) {
                                                    errors.password = 'Ce champ est requis';
                                                }
                                                if(!values.confirmePassword) {
                                                    errors.confirmePassword = 'Ce champ est requis';
                                                }
                                            }else if (values.password !== values.confirmePassword) {
                                                errors.errorPassword = 'Les mots de passes ne sont pas identiques';
                                            }

                                            return errors;
                                        }}
                                        onSubmit={handleSubmit}
                                    >
                                        <Form className="pr-10 pl-10">
                                            <ErrorMessage name="errorPassword" component="div" className="text-error"/>
                                            {/* Champ password */}
                                            <div>
                                                <Label htmlFor="password" id={"password"}>{t('password')}</Label>
                                                <Field type="password" id="password" name="password"
                                                       className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}/>
                                                <ErrorMessage name="password" component="div" className="text-error"/>
                                            </div>
                                            <br/>
                                            {/* Champ confirmePassword */}
                                            <div>
                                                <Label htmlFor="confirmePassword" id={"confirmePassword"}>{t('confirmePassword')}</Label>
                                                <Field type="password" id="confirmePassword" name="confirmePassword"
                                                       className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}/>
                                                <ErrorMessage name="confirmePassword" component="div" className="text-error"/>
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
                </div>
                <img
                    className="bg-primary ml-auto"
                    src={tree}
                    alt="arbre design"
                />
            </div>
        </Layout>
    );
};

export default ChangePassword;

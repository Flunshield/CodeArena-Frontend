// Importez les dépendances nécessaires
import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import {User} from "../Interface/Interface.ts";
import {createUser} from "../Helpers/apiHelper.ts";
import {useNavigate} from "react-router-dom";

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
    const handleSubmit = async (values: SignUpFormValues) => {
        const data: User = {
            userName: values.userName,
            password: values.password,
            email: values.email
        }
        const response = await createUser('user/creatUser', data)
        console.log(response.status)
        if(response.status === 201) {
            window.alert("Un mail pour confirmer votre adresse mail a été envoyé");
            navigate("/");
        } else if (response.status === 400) {
            setError("Le nom de compte et/ou l'adresse mail existe déja")
        }
    };

    return (
        <Formik
            initialValues={{ userName: '', password: '', email: '' }}
            validate={(values) => {
                const errors: Partial<SignUpFormValues> = {};

                // Validation des champs
                if (!values.userName) {
                    errors.userName = 'Ce champ est requis';
                }
                if (!values.password) {
                    errors.password = 'Ce champ est requis';
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
            <Form>
                {/* Champ userName */}
                <div>
                    {error && <p style={{color: 'red'}}>Le nom de compte existe déja</p>}
                    <Label htmlFor="userName" id={"userName"}>Nom de compte</Label>
                    <Field type="text" id="userName" name="userName" />
                    <ErrorMessage name="userName" component="div" />
                </div>

                {/* Champ password */}
                <div>
                    <Label htmlFor="password" id={"password"}>Mot de passe</Label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>

                {/* Champ email */}
                <div>
                    <Label htmlFor="email" id={"email"}>Adresse e-mail</Label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>

                {/* Bouton de soumission du formulaire */}
                <div>
                    <button type="submit">Créer un compte</button>
                </div>
            </Form>
        </Formik>
    );
};

export default SignUpForm;

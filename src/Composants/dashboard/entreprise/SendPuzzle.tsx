import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import clsx from "clsx";
import Card from "../../../ComposantsCommun/Card.tsx";
import {postElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import {PuzzlesEntreprise} from "../../../Interface/Interface.ts";

interface SendPuzzleProps {
    className?: string;
    closePopup?: () => void;
    puzzleToPopup?: PuzzlesEntreprise;
}

// Schema de validation pour les entrées du formulaire
const SendPuzzleSchema = Yup.object().shape({
    firstName: Yup.string().required('Le prénom est obligatoire'),
    lastName: Yup.string().required('Le nom est obligatoire'),
    email: Yup.string().email('Adresse email invalide').required('L’adresse email est obligatoire')
});

const SendPuzzle = ({className, closePopup, puzzleToPopup}: SendPuzzleProps) => {
    const authContext = useAuthContext();
    const {t} = useTranslation();
    const idPuzzle = puzzleToPopup?.id?.toString();
    return (
        <div id={idPuzzle} className={clsx(className, "rounded-lg bg-tertiari shadow-lg p-2 sm:p-6")}>
            <h3 className="text-sm sm:text-lg font-semibold text-quaternary mb-4 text-center">Envoyer un Puzzle</h3>
            <div className="flex flex-col xl:flex-row">
                <div className="flex-1">
                    <Formik
                        initialValues={{firstName: '', lastName: '', email: '', commentaire: ''}}
                        validationSchema={SendPuzzleSchema}
                        onSubmit={async (values, {setSubmitting, resetForm}) => {
                            const dataSend = {
                                "firstName": values.firstName,
                                "lastName": values.lastName,
                                "email": values.email,
                                "commentaire": values.commentaire,
                                "idPuzzle": idPuzzle
                            };
                            await postElementByEndpoint("entreprise/sendPuzzle", {
                                token: authContext.accessToken ?? "",
                                data: dataSend
                            });
                            setSubmitting(false);
                            resetForm();
                            closePopup && closePopup();
                            window.alert('Mail envoyé')
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form className="space-y-4 sm:space-y-6">
                                <div>
                                    <label htmlFor="firstName"
                                           className="block text-xs sm:text-sm font-medium text-quaternary">{t("firstName")}</label>
                                    <Field name="firstName" type="text"
                                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1 sm:p-2"/>
                                    <ErrorMessage name="firstName" component="div" className="text-error text-xs mt-1"/>
                                </div>

                                <div>
                                    <label htmlFor="lastName"
                                           className="block text-xs sm:text-sm font-medium text-quaternary">{t("lastName")}</label>
                                    <Field name="lastName" type="text"
                                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1 sm:p-2"/>
                                    <ErrorMessage name="lastName" component="div" className="text-error text-xs mt-1"/>
                                </div>

                                <div>
                                    <label htmlFor="email"
                                           className="block text-xs sm:text-sm font-medium text-quaternary">{t("email")}</label>
                                    <Field name="email" type="email"
                                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1 sm:p-2"/>
                                    <ErrorMessage name="email" component="div" className="text-error text-xs mt-1"/>
                                </div>
                                <div>
                                    <label htmlFor="commentaire"
                                           className="block text-xs sm:text-sm font-medium text-quaternary">{t("commentary")}</label>
                                    <Field as="textarea" id="commentaire" name="commentaire"
                                           className="h-54 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                                </div>
                                <div className="flex justify-center sm:justify-start">
                                    <button type="submit" disabled={isSubmitting}
                                            className="bg-petroleum-blue hover:shadow-md hover:shadow-light-blue text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded mr-2 sm:mr-5">
                                        {t("send")}
                                    </button>
                                    {closePopup && (
                                        <button type="button" onClick={closePopup}
                                                className="py-1 sm:py-2 px-2 sm:px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary">
                                            {t("close")}
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="flex-1 mt-4 xl:mt-0 sm:ml-4 h-full">
                    <Card className="flex flex-col">
                        <h2></h2>
                        <p className="text-center m-3 sm:m-5 font-bold">{puzzleToPopup?.title}</p>
                        <div className="m-3 sm:m-5">
                            <p className="underline font-bold">{t("detailsPuzzle")} : </p>
                            <p className="text-justify">{puzzleToPopup?.details}</p>
                            </div>
                        <pre
                            className="text-xs overflow-scroll h-auto sm:text-sm border p-2 sm:p-3 bg-gray-100 m-3 sm:m-5 rounded-lg">
                            {JSON.stringify(puzzleToPopup?.tests, null, 2)}
                        </pre>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SendPuzzle;

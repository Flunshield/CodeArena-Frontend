import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {DataToken, Pricing} from "../Interface/Interface.ts";
import {postElementByEndpoint} from "../Helpers/apiHelper.ts";
import clsx from "clsx";
import {useAuthContext} from "../AuthContext.tsx";
import {checkNbTestCreated} from "../Helpers/methodeHelper.ts";
import {useEffect, useState} from "react";
import {GROUPS} from "../constantes/constantes.ts";
import {DONNEES_TESTS} from "../constantes/constanteEntreprise.ts";
import {useTranslation} from "react-i18next";
import {JwtPayload} from "jwt-decode";

interface PuzzleFormValues {
    title: string;
    details: string;
    tests: string;
}

interface PuzzleFormProps {
    className?: string;
    id?: string;
    title?: string;
    details?: string;
    tests?: JSON | JSON[];
    closePopup?: () => void;
    setIsSubmitted?: () => void;
    nbPuzzleCreated?: number;
    lastCommande?: Pricing;
    sendPuzzle?: boolean;
}

const PuzzleSchema = Yup.object().shape({
    title: Yup.string().required('Champ obligatoire'),
    details: Yup.string().required('Champ obligatoire'),
    tests: Yup.string().required('Champ obligatoire').test(
        'is-json',
        'JSON non valide',
        value => {
            try {
                JSON.parse(value);
                return true;
            } catch {
                return false;
            }
        }
    )
});

const PuzzleForm = ({
                        className,
                        id,
                        title,
                        details,
                        tests,
                        closePopup,
                        setIsSubmitted,
                        nbPuzzleCreated,
                        lastCommande = {} as Pricing,
                        sendPuzzle = false
                    }: PuzzleFormProps) => {
    const {t} = useTranslation();
    const [canCreateTest, setCanCreateTest] = useState<boolean>(true);
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;

    const initialValues: PuzzleFormValues = {
        title: title || t("titlePuzzle"),
        tests: tests ? JSON.stringify(tests, null, 2) : JSON.stringify(DONNEES_TESTS, null, 2),
        details: details || "Sujet du puzzle"
    };

    useEffect(() => {
        if (infos?.data.groups.roles === GROUPS.ENTREPRISE) {
            if(nbPuzzleCreated && lastCommande) {
                setCanCreateTest(checkNbTestCreated(nbPuzzleCreated, lastCommande));
            }
        }
    }, [nbPuzzleCreated, lastCommande]);

    return (
        <div id="PuzzleForm" className={clsx(className, "m-5 rounded-lg bg-tertiari shadow-lg p-6")}>
            <h3 className="text-lg font-semibold text-quaternary mb-4">{t("createPuzzleTitle")}</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={PuzzleSchema}
                onSubmit={async (values, actions) => {
                    if (!canCreateTest) {
                        alert(t("limitCreatPuzzleAlert"));
                        actions.setSubmitting(false);
                        return;
                    }

                    const endpoint = id ? "puzzle/updatePuzzle" : "puzzle/create";
                    const data = id ? {
                        title: values.title,
                        details: values.details,
                        tests: JSON.parse(values.tests),
                        id: parseInt(id),
                        patch: true
                    } : {
                        "title": values.title,
                        "details": values.details,
                        "tests": JSON.parse(values.tests),
                        "user": infos?.data,
                    };

                    const result = await postElementByEndpoint(endpoint, {
                        token: authContext?.accessToken ?? "",
                        data
                    });

                    if ([200, 201].includes(result.status)) {
                        setIsSubmitted && setIsSubmitted();
                        closePopup && closePopup();
                    }
                    actions.setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="title"
                                   className="block text-sm font-medium text-quaternary">{t("titlePuzzle")}</label>
                            <Field id="title" name="title" type="text"
                                   className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name="title" component="div" className="text-error text-xs mt-1"/>
                        </div>
                        <div>
                            <label htmlFor="details"
                                   className="block text-sm font-medium text-quaternary">Sujet du puzzle</label>
                            <Field as="textarea" id="details" name="details" type="text"
                                   className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name="details" component="div" className="text-error text-xs mt-1"/>
                        </div>
                        <div>
                            <label htmlFor="tests" className="block text-sm font-medium text-quaternary">{t("tests")}
                                (JSON)</label>
                            <Field as="textarea" id="tests" name="tests"
                                   className="h-96 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name="tests" component="div" className="text-error text-xs mt-1"/>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" disabled={isSubmitting || !canCreateTest || sendPuzzle}
                                    className={clsx(canCreateTest ? "bg-petroleum-blue hover:shadow-md hover:shadow-light-blue" : "bg-soft-gray ", "py-2 px-4 mr-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-tertiari")}>
                                {t("send")}
                            </button>
                            {closePopup && (
                                <button type="button" onClick={closePopup}
                                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary">
                                    {t("close")}
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PuzzleForm;

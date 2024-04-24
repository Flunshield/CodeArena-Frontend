import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import {postElementByEndpoint, updatePuzzle} from "../../Helpers/apiHelper.ts";
import clsx from "clsx";

interface PuzzleFormValues {
    details: string;
    tests: string;
}

interface PuzzleFormProps {
    className?: string;
    id?: string;
    details?: string;
    tests?: JSON;
    closePopup?: () => void;
    setIsSubmitted?: () => void;
    isSubmitted?: boolean;
}

const PuzzleSchema = Yup.object().shape({
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

const PuzzleForm = (props: PuzzleFormProps) => {
    const {className, id, details, tests, closePopup, setIsSubmitted} = props;
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const initialValues: PuzzleFormValues = {
        details: details || "Titre du puzzle",
        tests: tests ? JSON.stringify(tests, null, 2) : JSON.stringify([
            {
                "name": "Test 1",
                "condition": "add(1, 2) === 3",
                "successMessage": "Test 1 réussi",
                "failureMessage": "Test 1 échoué"
            },
            {
                "name": "Test 2",
                "condition": "add(2, 6) === 8",
                "successMessage": "Test 2 réussi",
                "failureMessage": "Test 2 échoué"
            },
            {
                "name": "Test 3",
                "condition": "add(2, 3) === 5",
                "successMessage": "Test 3 réussi",
                "failureMessage": "Test 3 échoué"
            }
        ], null, 2)
    };

    return (
        <div id={id} className={clsx(className, "m-5 rounded-lg bg-tertiari shadow-lg p-6")}>
            <h3 className="text-lg font-semibold text-quaternary mb-4">Création d&apos;un test</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={PuzzleSchema}
                onSubmit={async (values, actions) => {
                    let result;
                    if (closePopup && id) {
                        result = await updatePuzzle(authContext.accessToken ?? "", {
                            details: values.details,
                            tests: JSON.parse(values.tests),
                            id: parseInt(id)
                        });
                    } else {
                        result = await postElementByEndpoint("puzzle/create", {
                            token: authContext.accessToken ?? "",
                            data: {
                                "details": values.details,
                                "tests": JSON.parse(values.tests),
                                "user": infos.data
                            }
                        });
                    }
                    if (result.status === 201) {
                        setIsSubmitted && setIsSubmitted();
                        actions.setSubmitting(false);
                        closePopup && closePopup();
                    }
                    if (result.status === 200) {
                        setIsSubmitted && setIsSubmitted();
                        actions.setSubmitting(false);
                        closePopup && closePopup();
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-quaternary">Titre du
                                puzzle</label>
                            <Field id="details" name="details" type="text"
                                   className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name="details" component="div" className="text-error text-xs mt-1"/>
                        </div>
                        <div className="h-auto">
                            <label htmlFor="tests" className="block text-sm font-medium text-quaternary">Tests
                                (JSON)</label>
                            <Field as="textarea" id="tests" name="tests"
                                   className="h-96 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name="tests" component="div" className="text-error text-xs mt-1"/>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" disabled={isSubmitting}
                                    className="py-2 px-4 mr-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-petroleum-blue hover:shadow-xl focus:outline-none focus:ring-offset-2 focus:ring-primary">
                                Envoyer
                            </button>
                            {closePopup && (
                                <button type="button" onClick={closePopup}
                                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:shadow-xl">
                                    Fermer
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

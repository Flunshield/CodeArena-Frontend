import clsx from "clsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {DONNEES_TESTS} from "../../constantes/constanteEntreprise.ts";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import useUserInfos from "../../hook/useUserInfos.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {Ranking} from "../../Interface/Interface.ts";
import {useState} from "react";
import Notification from "../../ComposantsCommun/Notification.tsx";

interface puzzleAdminProps {
    className?: string;
    id?: string;
    title?: string;
    details?: string;
    tests?: JSON | JSON[];
    closePopup?: () => void;
    setIsSubmitted?: () => void;
    ranks?: Ranking[];
}

interface PuzzleFormValues {
    title: string;
    details: string;
    tests: string;
    rankingId?: number;
    eventId?: number;
    example?: string;
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
const puzzleAdmin = ({
                         className,
                         title,
                         details,
                         tests,
                         closePopup,
                         setIsSubmitted,
                         ranks
                     }: puzzleAdminProps) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const userInfos = useUserInfos();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const initialValues: PuzzleFormValues = {
        title: title || t("titlePuzzle"),
        tests: tests ? JSON.stringify(tests, null, 2) : JSON.stringify(DONNEES_TESTS, null, 2),
        details: details || "Sujet du puzzle",
        rankingId: undefined,
        eventId: undefined,
        example: ""
    };


    return (
        <div id="PuzzleForm" className={clsx(className, "m-5 rounded-lg bg-tertiari shadow-lg p-6")}>
            <h3 className="text-lg font-semibold text-quaternary mb-4">{t("createPuzzle")}</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={PuzzleSchema}
                onSubmit={async (values, actions) => {
                    const endpoint = "puzzle/createPuzzleAdmin";
                    const data = {
                        "title": values.title,
                        "details": values.details,
                        "tests": JSON.parse(values.tests),
                        "user": userInfos,
                        "rankingId": values.rankingId,
                        "eventId": values.eventId,
                        "example": values.example
                    };

                    const result = await postElementByEndpoint(endpoint, {
                        token: authContext?.accessToken ?? "",
                        data
                    });

                    if ([200, 201].includes(result.status)) {
                        setIsSubmitted && setIsSubmitted();
                        closePopup && closePopup();
                        setNotificationMessage(t('updateSuccess'));
                        setNotificationType('success');
                        setShowNotification(true);
                    } else {
                        setNotificationMessage(t('updateError'));
                        setNotificationType('error');
                        setShowNotification(true);
                    }
                    actions.setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-6">
                        {showNotification && (
                            <Notification
                                message={notificationMessage}
                                type={notificationType}
                                onClose={() => setShowNotification(false)}
                            />
                        )}
                        <div className="flex justify-around max-md:flex-col max-md:space-y-6">
                            <div className="md:w-1/2">
                                <label htmlFor="title"
                                       className="block text-sm font-medium text-quaternary">{t("titlePuzzle")}</label>
                                <Field id="title" name="title" type="text"
                                       className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                                <ErrorMessage name="title" component="div" className="text-error text-xs mt-1"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="rankingId"
                                   className="block text-sm font-medium text-quaternary">{t('ranking')}</label>
                            <Field as="select" id="rankingId" name="rankingId"
                                   className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 mt-1">
                                <option value="">-</option>
                                {ranks?.map((rank) => (
                                    <option key={rank.id} value={rank.id}>{rank.title}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="rankingId" component="div" className="text-error text-xs mt-1"/>
                        </div>
                        <div>
                            <label htmlFor="eventId"
                                   className="block text-sm font-medium text-quaternary">{t('event')}</label>
                            <Field as="input" id="eventId" name="eventId" type="number"
                                   className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name="eventId" component="div" className="text-error text-xs mt-1"/>
                        </div>
                        <div>
                            <label htmlFor="details"
                                   className="block text-sm font-medium text-quaternary">{t('sujetPuzzle')}</label>
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
                        <div>
                            <label htmlFor="example" className="block text-sm font-medium text-quaternary">{t("example")}</label>
                            <Field as="textarea" id="example" name="example"
                                   className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name="tests" component="div" className="text-error text-xs mt-1"/>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" disabled={isSubmitting}
                                    className={clsx("bg-petroleum-blue hover:shadow-md hover:shadow-light-blue py-2 px-4 mr-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-tertiari")}>
                                {t("create")}
                            </button>
                            {closePopup && (
                                <button type="button" onClick={closePopup}
                                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-tertiari bg-secondary hover:bg-primary">
                                    {t("close")}
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default puzzleAdmin;
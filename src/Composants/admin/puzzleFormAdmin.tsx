import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Puzzle, Ranking} from "../../Interface/Interface.ts";
import {postElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";

interface PuzzleFormProps {
    initialValues: Puzzle;
    ranks: Ranking[];
    setIsSubmitted: () => void;
    setPopupOpen: (popup: boolean) => void;
}

const PuzzleFormAdmin: React.FC<PuzzleFormProps> = ({initialValues, ranks, setIsSubmitted, setPopupOpen}) => {
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? "";
    // Validation Schema avec Yup
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        details: Yup.string().required('Details are required'),
        tests: Yup.array().of(Yup.mixed()).required('At least one test is required'),
        rankingID: Yup.number().optional(),
        eventID: Yup.number().optional(),
    });

    async function updatePuzzle(value: Puzzle) {
        return await postElementByEndpoint("admin/updatePuzzleAdmin", {
            token: token, data: {value}
        }).then(async (response) => {
            if (response.ok) {
                setPopupOpen(false);
                setIsSubmitted();
            }
        })
    }

    function onSubmit(values: Puzzle) {
        updatePuzzle(values);
        setIsSubmitted();
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Update Puzzle</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({values, setFieldValue}) => (
                    <Form className="space-y-4">
                        {/* Title */}
                        <div>
                            <label htmlFor="title-puzzle" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <Field
                                id="title-puzzle"
                                name="title"
                                type="text"
                                className="mt-1 h-12 p-5 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="title-puzzle" component="div" className="text-red-500 text-sm"/>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description-puzzle" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <Field
                                id="description-puzzle"
                                name="description"
                                as="textarea"
                                className="mt-1 block h-24 p-5 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="description-puzzle" component="div" className="text-red-500 text-sm"/>
                        </div>

                        {/* Tests */}
                        <div>
                            <label htmlFor="tests-puzzle" className="block text-sm font-medium text-gray-700">
                                Tests (JSON)
                            </label>
                            <Field
                                id="tests-puzzle"
                                name="tests"
                                as="textarea"
                                className="mt-1 block h-24 p-5 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={JSON.stringify(values.tests, null, 2)}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setFieldValue('tests', JSON.parse(e.target.value))
                                }
                            />
                            <ErrorMessage name="tests-puzzle" component="div" className="text-red-500 text-sm"/>
                        </div>

                        {/* Details */}
                        <div>
                            <label htmlFor="details-puzzle" className="block text-sm font-medium text-gray-700">
                                Details
                            </label>
                            <Field
                                id="details-puzzle"
                                name="details"
                                as="textarea"
                                className="mt-1 block h-12 p-5 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <ErrorMessage name="details-puzzle" component="div" className="text-red-500 text-sm"/>
                        </div>

                        {/* Ranking ID */}
                        <div>
                            <label htmlFor="rankingId-puzzle"
                                   className="block text-sm font-medium text-quaternary">Classement</label>
                            <Field as="select" id="rankingId-puzzle" name="rankingsID"
                                   className="block h-12 p-2 w-full shadow-sm sm:text-sm border-gray-300 rounded-md mt-1">
                                <option
                                    value={initialValues?.rankings?.id ?? ""}>{initialValues?.rankings?.title ?? " - "}</option>
                                {ranks?.map((rank) => (
                                    <option key={rank.id} value={rank.id}>{rank.title}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="rankingId-puzzle" component="div" className="text-error text-xs mt-1"/>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="button"
                                onClick={() => onSubmit(values)}
                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Update Puzzle
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PuzzleFormAdmin;

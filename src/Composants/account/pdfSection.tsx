import {FadeIn} from "../../ComposantsCommun/FadeIn.tsx";
import {Container} from "../../ComposantsCommun/Container.tsx";
import {useTranslation} from "react-i18next";
import {CVFormState, DataToken} from "../../Interface/Interface.ts";
import {getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";

interface pdfSectionProps {
    getCvs: CVFormState[];
    deleteCv: (idCv: number) => void;
    setPopupCvOpen: (value: boolean) => void;
    setShowNotification: (value: boolean) => void;
    setNotificationType: (value: string) => void;
    setNotificationMessage: (value: string) => void;
}

const PdfSection = ({getCvs, deleteCv, setPopupCvOpen, setShowNotification, setNotificationType, setNotificationMessage}: pdfSectionProps) => {
    const { t } = useTranslation();
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;


    const getPdf = async (idCv: number) => {
        getElementByEndpoint("user/pdfCvUser?id=" + infos.data.id + "&idCv=" + idCv, {
            token: authContext.accessToken ?? "",
            data: "",
        }).then(async (response) => {
            if (response.status === 200) {
                const result = await response.blob();
                const url = window.URL.createObjectURL(new Blob([result]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'cv.pdf');
                document.body.appendChild(link);
                link.click();
            } else {
                setNotificationMessage(t('errorUserInfos'));
                setNotificationType('error');
                setShowNotification(true);
            }
        })
    }

    return (<Container>
            <FadeIn>
                <div className="flex flex-col w-full justify-center">
                    <label id="labelVosCv" className="text-neutral-900 text-3xl font-bold mb-4">
                        {t("voscvs")}
                    </label>
                    <div className="overflow-x-auto text-center border-2 rounded-xl m-5">
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr className="rounded-xl">
                                <th className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-100 border-b border-gray-200">#</th>
                                <th className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-100 border-b border-gray-200">CV
                                    Name
                                </th>
                                <th className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-100 border-b border-gray-200">{t('action')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getCvs.map((cv, index) => (
                                <tr key={cv.id} className="border-b">
                                    <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10">{index + 1}</td>
                                    <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10">{cv.cvName}</td>
                                    <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10">
                                        <div className="flex space-x-2 justify-center">
                                            <button
                                                className="bg-petroleum-blue text-tertiari font-bold rounded-xl p-2 border-2 border-tertiari shadow-2xl w-24"
                                                onClick={() => getPdf(cv.id)}
                                            >
                                                {t('visualiser')}
                                            </button>
                                            <button
                                                className="bg-error text-tertiari font-bold rounded-xl p-2 border-2 border-tertiari shadow-2xl w-12"
                                                onClick={() => deleteCv(cv.id)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {getCvs.length <= 4 && (
                            <button
                                onClick={() => setPopupCvOpen(true)}
                                className="bg-petroleum-blue text-tertiari font-bold rounded-xl p-5 border-2 border-tertiari shadow-2xl w-2/3 mt-5 mb-5"
                            >
                                {t('createCv')}
                            </button>
                        )}
                    </div>
                </div>
            </FadeIn>
        </Container>
    );
}

export default PdfSection;
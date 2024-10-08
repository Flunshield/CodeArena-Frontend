import {useEffect, useState} from "react";
import Layout from "../ComposantsCommun/Layout";
import MyForm from "../Composants/account/MyForm";
import InfosUser from "../Composants/account/infosUser";
import {useAuthContext} from "../AuthContext";
import {JwtPayload} from "jwt-decode";
import {CVFormState, DataToken} from "../Interface/Interface";
import {GROUPS} from "../constantes/constantes";
import HistoriqueAchat from "../Composants/account/entreprise/HistoriqueAchat";
import {deleteElementByEndPoint, getElementByEndpoint} from "../Helpers/apiHelper";
import Notification from "../ComposantsCommun/Notification";
import InformationGenerale from "../Composants/account/entreprise/InformationGenerale";
import {useTranslation} from "react-i18next";
import {Container} from "../ComposantsCommun/Container";
import {FadeIn, FadeInStagger} from "../ComposantsCommun/FadeIn";
import CVForm from "../Composants/account/CVForm.tsx";
import PdfSection from "../Composants/account/pdfSection.tsx";
import useUserInfos from "../hook/useUserInfos.ts";
import "../css/general.css";

function MyAccount() {
    const [submitCount, setSubmitCount] = useState(0);
    const infosUserById = useUserInfos(submitCount);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopupCvOpen, setPopupCvOpen] = useState(false);
    const [isInformationGeneraleCliked, setIsInformationGeneraleCliked] = useState(false);
    const [isHistoriqueOrderClicked, setIsHistoriqueOrderClicked] = useState(false);
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const isEntreprise = infos.data.groups.roles === GROUPS.ENTREPRISE;
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [getCvs, setCvs] = useState<CVFormState[]>([]);
    const getAllCv = getElementByEndpoint("user/getCv?id=" + infos.data.id, {
        token: authContext.accessToken ?? "",
        data: "",
    });

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = async () => {
        if (isPopupOpen) {
            setPopupOpen(false);
        }
        if (isPopupCvOpen) {
            setPopupCvOpen(false);
        }
    };

    const deleteCv = async (idCv: number) => {
        const deleteCv = await deleteElementByEndPoint("user/deleteCv", {
            token: authContext.accessToken ?? "",
            idElementToDelete: idCv,
            userId: infos.data.id,
        });

        if (deleteCv.status === 200) {
            setSubmitCount(count => count + 1);
        }
    };


    useEffect(() => {
        if (isInformationGeneraleCliked) {
            document.getElementById('informationGenerale')?.scrollIntoView({behavior: "smooth"});
            setIsInformationGeneraleCliked(false);
        }
        if (isHistoriqueOrderClicked) {
            document.getElementById('historiqueAchat')?.scrollIntoView({behavior: "smooth"});
            setIsHistoriqueOrderClicked(false);
        }

        getAllCv.then(async (response) => {
            if (response.status === 200) {
                const result = await response.json();
                setCvs(result);
            } else {
                setNotificationMessage(t('errorUserInfos'));
                setNotificationType('error');
                setShowNotification(true);
            }
        });
    }, [submitCount]);

    return (
        <Layout>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}

            <Container>
                <div className="flex flex-col items-center">
                    <FadeInStagger className="w-full">
                        {/* Section Infos User */}
                        <FadeIn className="mb-12">
                            <InfosUser
                                openPopup={openPopup}
                                setIsInformationGeneraleCliked={setIsInformationGeneraleCliked}
                                setIsHistoriqueOrderClicked={setIsHistoriqueOrderClicked}
                                setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                infosUserById={infosUserById}
                            />
                        </FadeIn>

                        {isEntreprise ? (
                            <div className="w-full space-y-8">
                                <FadeIn>
                                    <InformationGenerale
                                        infosUserById={infosUserById}
                                        setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                    />
                                </FadeIn>
                                <FadeIn>
                                    <HistoriqueAchat/>
                                </FadeIn>
                            </div>
                        ) : (
                            <FadeIn>
                                <PdfSection
                                    getCvs={getCvs}
                                    deleteCv={deleteCv}
                                    setPopupCvOpen={setPopupCvOpen}
                                    setShowNotification={setShowNotification}
                                    setNotificationType={setNotificationType}
                                    setNotificationMessage={setNotificationMessage}
                                    setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                />
                            </FadeIn>
                        )}
                    </FadeInStagger>
                </div>
            </Container>

            {/* Popup Section */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-tertiary bg-opacity-75 p-6 z-50">
                    <MyForm
                        onClose={closePopup}
                        infosUserById={infosUserById}
                        setIsSubmitted={() => setSubmitCount(count => count + 1)}
                    />
                </div>
            )}

            {isPopupCvOpen && (
                <div className="fixed inset-0 z-50 p-4 lg:p-8 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-tertiary p-8 rounded-md shadow-lg max-h-full w-full overflow-y-auto scrollbar-hide">
                        <CVForm
                            infosUserById={infosUserById}
                            closePopup={closePopup}
                            setShowNotification={setShowNotification}
                            setNotificationType={setNotificationType}
                            setNotificationMessage={setNotificationMessage}
                            setIsSubmitted={() => setSubmitCount(count => count + 1)}
                        />
                    </div>
                </div>
            )}
        </Layout>

    )
        ;
}

export default MyAccount;

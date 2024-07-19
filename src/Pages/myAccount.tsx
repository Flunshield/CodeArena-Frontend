import {useEffect, useState} from "react";
import Layout from "../ComposantsCommun/Layout";
import Presentation from "../Composants/account/presentation";
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
import {SectionIntro} from "../ComposantsCommun/SectionIntro";
import {FadeIn, FadeInStagger} from "../ComposantsCommun/FadeIn";
import CVForm from "../Composants/account/CVForm.tsx";
import PdfSection from "../Composants/account/pdfSection.tsx";
import useUserInfos from "../hook/useUserInfos.ts";

function MyAccount() {
    const [submitCount, setSubmitCount] = useState(0);
    const infosUserById= useUserInfos(submitCount);
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
            <Container className="rounded-xl bg-tertiari mx-auto">
                <SectionIntro title={t("myAccount")} className="text-center mt-10"/>
                <div className="flex flex-col items-center">
                    <FadeInStagger className="w-full max-w-4xl">
                        <FadeIn>
                            <InfosUser
                                openPopup={openPopup}
                                setIsInformationGeneraleCliked={setIsInformationGeneraleCliked}
                                setIsHistoriqueOrderClicked={setIsHistoriqueOrderClicked}
                                setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                infosUserById={infosUserById}
                            />
                        </FadeIn>
                        {isEntreprise ? (
                            <div className="w-full">
                                <FadeIn className="mb-24">
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
                            <div>
                                <FadeIn className="flex flex-col justify-items-center mb-10 space-y-8">
                                    <Presentation infosUserById={infosUserById}/>
                                </FadeIn>
                                <FadeIn className="flex flex-col justify-items-center mb-10 space-y-8">
                                    <PdfSection getCvs={getCvs} deleteCv={deleteCv} setPopupCvOpen={setPopupCvOpen}
                                                setShowNotification={setShowNotification}
                                                setNotificationType={setNotificationType}
                                                setNotificationMessage={setNotificationMessage}
                                                setIsSubmitted={() => setSubmitCount(count => count + 1)}/>
                                </FadeIn>
                            </div>
                        )}
                    </FadeInStagger>
                </div>
            </Container>
            {
                isPopupOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-tertiari bg-opacity-75 p-6">
                        <MyForm onClose={closePopup} infosUserById={infosUserById}
                                setIsSubmitted={() => setSubmitCount(count => count + 1)}/>
                    </div>
                )
            }
            {
                isPopupCvOpen && (
                    <div
                        className="fixed top-0 left-0 z-50 p-4 lg:p-8 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <button
                            onClick={closePopup}
                            className="absolute top-8 right-8 lg:top-16 lg:right-16 rounded-full bg-error hover:bg-tertiary-light text-tertiari font-semibold py-2 px-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105 z-50"
                        >
                            X
                        </button>
                        <div className="relative bg-tertiari p-8 rounded-md shadow-lg max-h-full w-full overflow-y-auto">
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
                )
            }
        </Layout>
    )
        ;
}

export default MyAccount;

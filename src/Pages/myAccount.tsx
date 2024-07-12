import  { useEffect, useState } from "react";
import Layout from "../ComposantsCommun/Layout";
import Presentation from "../Composants/account/presentation";
import MyForm from "../Composants/account/MyForm";
import InfosUser from "../Composants/account/infosUser";
import { useAuthContext } from "../AuthContext";
import { JwtPayload } from "jwt-decode";
import { DataToken, User } from "../Interface/Interface";
import { GROUPS } from "../constantes/constantes";
import HistoriqueAchat from "../Composants/account/entreprise/HistoriqueAchat";
import { getElementByEndpoint } from "../Helpers/apiHelper";
import Notification from "../ComposantsCommun/Notification";
import InformationGenerale from "../Composants/account/entreprise/InformationGenerale";
import { PRICING } from "../constantes/constanteEntreprise";
import { useTranslation } from "react-i18next";
import { Container } from "../ComposantsCommun/Container";
import  {SectionIntro}  from "../ComposantsCommun/SectionIntro";
import { FadeIn, FadeInStagger } from "../ComposantsCommun/FadeIn";

function MyAccount() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isInformationGeneraleCliked, setIsInformationGeneraleCliked] = useState(false);
    const [isHistoriqueOrderClicked, setIsHistoriqueOrderClicked] = useState(false);
    const [submitCount, setSubmitCount] = useState(0);
    const {t} = useTranslation();
    const authContext = useAuthContext();
    // Obliger de faire ces étapes pour récupérer les infos
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const isEntreprise = infos.data.groups.roles === GROUPS.ENTREPRISE
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [infosUserById, setInfosUserById] = useState<User>({} as User);
    const getUserById = getElementByEndpoint("user/getUser?id=" + infos.data.id, {
        token: authContext.accessToken ?? "",
        data: "",
    })

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = async () => {
        setPopupOpen(false);
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

        getUserById.then(async (response) => {
            if (response.status === 200) {
                const result = await response.json();
                result.commandeEntrepriseFormatted = {
                    commande: result?.commandeEntreprise[0],
                    pricing: PRICING.find((pricing) => pricing.idApi === result?.commandeEntreprise[0].item)
                };
                setInfosUserById(result);
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
            <Container className="mt-16 bg-white">
                <SectionIntro title={t("myAccount")} className="mb-12 text-center">
                </SectionIntro>
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
                                    <HistoriqueAchat />
                                </FadeIn>
                            </div>
                        ) : (
                            <FadeIn className="w-full">
                                <Presentation infosUserById={infosUserById}/>
                            </FadeIn>
                        )}
                    </FadeInStagger>
                </div>
            </Container>
            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-lg">
                        <MyForm onClose={closePopup} infosUserById={infosUserById} />
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default MyAccount;

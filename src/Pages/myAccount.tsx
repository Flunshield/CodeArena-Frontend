import Layout from "../ComposantsCommun/Layout.tsx";
import Presentation from "../Composants/account/presentation.tsx";
import { useEffect, useState } from "react";
import MyForm from "../Composants/account/MyForm.tsx";
import InfosUser from "../Composants/account/infosUser.tsx";
import { useAuthContext } from "../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { DataToken, User } from "../Interface/Interface.ts";
import { GROUPS } from "../constantes/constantes.ts";
import HistoriqueAchat from "../Composants/account/entreprise/HistoriqueAchat.tsx";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import Notification from "../ComposantsCommun/Notification.tsx";
import InformationGenerale from "../Composants/account/entreprise/InformationGenerale.tsx";
import { PRICING } from "../constantes/constanteEntreprise.ts";
import { useTranslation } from "react-i18next";

function MyAccount() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isInformationGeneraleCliked, setIsInformationGeneraleCliked] = useState(false);
    const [isHistoriqueOrderClicked, setIsHistoriqueOrderClicked] = useState(false);
    const [submitCount, setSubmitCount] = useState(0);
    const { t } = useTranslation();
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
            document.getElementById('informationGenerale')?.scrollIntoView({ behavior: "smooth" });
            setIsInformationGeneraleCliked(false);
        }
        if (isHistoriqueOrderClicked) {
            document.getElementById('historiqueAchat')?.scrollIntoView({ behavior: "smooth" });
            setIsHistoriqueOrderClicked(false);
        }

        getUserById.then(async (response) => {
            if (response.status === 200) {
                const result = await response.json();
                result.commandeEntrepriseFormatted = {
                    commande: result?.commandeEntreprise[0],
                    pricing: PRICING.find((pricing) => pricing.idApi === result?.commandeEntreprise[0].item)};
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
            <div className="flex flex-col md:flex-row bg">
                <aside className="w-full md:w-1/4  p-4">
                    <InfosUser
                        openPopup={openPopup}
                        setIsInformationGeneraleCliked={setIsInformationGeneraleCliked}
                        setIsHistoriqueOrderClicked={setIsHistoriqueOrderClicked}
                        setIsSubmitted={() => setSubmitCount((count) => count + 1)}
                        infosUserById={infosUserById}
                    />
                </aside>
                <main className="w-full md:w-3/4 p-4">
                    {isEntreprise ?
                        <div>
                            <InformationGenerale infosUserById={infosUserById}
                                setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                className="mb-24" />
                            <HistoriqueAchat />
                        </div>
                        :
                        <div className=" text-left">
                            <Presentation infosUserById={infosUserById} />
                        </div>
                    }
                </main>
            </div>
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
                    <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-lg animate-fade-in">
                        <MyForm onClose={closePopup} infosUserById={infosUserById} />
                    </div>
                </div>

            )}
        </Layout>
    );
}

export default MyAccount;

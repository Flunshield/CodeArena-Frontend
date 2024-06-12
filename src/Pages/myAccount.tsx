import { useEffect, useState } from 'react';
import Layout from '../ComposantsCommun/Layout.tsx';
import Presentation from '../Composants/account/presentation.tsx';
import InfosUser from '../Composants/account/infosUser.tsx';
import HistoriqueAchat from '../Composants/account/entreprise/HistoriqueAchat.tsx';
import InformationGenerale from '../Composants/account/entreprise/InformationGenerale.tsx';
import MyForm from '../Composants/account/MyForm.tsx';
import Notification from '../ComposantsCommun/Notification.tsx';
import { useAuthContext } from '../AuthContext.tsx';
import { getElementByEndpoint } from '../Helpers/apiHelper.ts';
import { PRICING } from '../constantes/constanteEntreprise.ts';
import { useTranslation } from 'react-i18next';
import { DataToken, User } from '../Interface/Interface.ts';
import { GROUPS } from '../constantes/constantes.ts';

function MyAccount() {
    const { t } = useTranslation();
    const authContext = useAuthContext();

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
    const [submitCount, setSubmitCount] = useState(0);

    const infosUser = authContext?.infosUser;
    let infos: DataToken | null = null;
    if (typeof infosUser === 'object' && 'aud' in infosUser) {
        infos = infosUser.aud as unknown as DataToken;
    }
    
    const isEntreprise = infos?.data.groups.roles === GROUPS.ENTREPRISE;

    const getUserById = async () => {
        try {
            const response = await getElementByEndpoint(`user/getUser?id=${infosUser.data.id}`, {
                token: authContext.accessToken ?? '',
                data: '',
            });
            if (response.status === 200) {
                const result = await response.json();
                result.commandeEntrepriseFormatted = {
                    commande: result?.commandeEntreprise[0],
                    pricing: PRICING.find((pricing) => pricing.idApi === result?.commandeEntreprise[0].item),
                };
                setInfosUserById(result);
            } else {
                setNotificationMessage(t('errorUserInfos'));
                setNotificationType('error');
                setShowNotification(true);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setNotificationMessage(t('errorUserInfos'));
            setNotificationType('error');
            setShowNotification(true);
        }
    };

    useEffect(() => {
        getUserById();
    }, [submitCount]);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const handleInformationGeneraleClick = () => {
        document.getElementById('informationGenerale')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleHistoriqueOrderClick = () => {
        document.getElementById('historiqueAchat')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Layout>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}

            <div className="flex flex-col">
                <InfosUser openPopup={openPopup} setIsInformationGeneraleCliked={setIsInformationGeneraleCliked}
                           setIsHistoriqueOrderClicked={setIsHistoriqueOrderClicked}
                           setIsSubmitted={() => setSubmitCount(count => count + 1)}
                           infosUserById={infosUser}/>
                {isEntreprise ?
                    <div>
                        <InformationGenerale infosUserById={infosUser}
                                             setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                             className="mb-24"/>
                        <HistoriqueAchat/>
                    </div>
                    :
                    <div className=" text-left">
                        <Presentation/>
                    </div>
                }
            </div>

            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90">
                    <div className="bg-secondary p-8 rounded-md flex flex-col">
                        <MyForm onClose={closePopup} />
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default MyAccount;

import {DataToken, Pricing} from "../../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import Button from "../../../ComposantsCommun/Button.tsx";
import {useAuthContext} from "../../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {getElementByEndpoint, postElementByEndpoint} from "../../../Helpers/apiHelper.ts";
import {useState} from "react";
import Notification from "../../../ComposantsCommun/Notification.tsx";

interface StatsProps {
    lastCommande: Pricing;
    submitCount: number;
    nbPuzzlesPlayed: number;
    nbPuzzleCreated: number;
}

const stats = ({
                   lastCommande,
                   nbPuzzlesPlayed,
                   nbPuzzleCreated,
               }: StatsProps) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    function handleClick() {
        postElementByEndpoint('entreprise/unsuscribe', {
            data: {userId: infos?.data?.id},
            token: authContext.accessToken ?? ""
        }).then(async (repsonse) => {
            console.log(repsonse);
            if (repsonse.status === 201) {
                setNotificationMessage(t('abonementSuccess'));
                setNotificationType('success');
                setShowNotification(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            if (repsonse.status === 404) {
                setNotificationMessage(t('abonementError'));
                setNotificationType('error');
                setShowNotification(true);
            }
        })
    }


    const getLatestInvoice = async () => {

        try {
            const response = await getElementByEndpoint('stripe/lastCommande?id=' + infos.data.id, {
                data: "",
                token: authContext.accessToken ?? ""
            })

            if (!response.ok) {
                console.error('Failed to fetch the latest invoice');
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '-').replace(',', '').replace(/:/g, '');
            const a = document.createElement('a');
            a.href = url;
            a.download = `${formattedDate}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error fetching invoice:', error);
        }
    }

    const btnGroup = <div className=" w-full flex justify-around">
        <Button id="button-recup-invoice" type="button" onClick={getLatestInvoice}
                className="bg-gris-chaud text-tertiari p-1 rounded-lg">{t("recupInvoice")}</Button>
        <Button type={"button"} className="bg-gris-chaud text-tertiari p-1 rounded-lg"
                id={"unscribed"}
                onClick={handleClick}> {t("unscribed")} </Button>
    </div>

    const stats = [
        {
            id: 1,
            title: t("abonnement"),
            value: lastCommande?.title,
            button: btnGroup
        },
        {id: 2, title: t("nbTestCreate"), value: nbPuzzleCreated + "/" + (lastCommande?.nbCreateTest)},
        {id: 3, title: t("nbTestRealized"), value: nbPuzzlesPlayed},
    ];

    return (
        <div className="font-sans m-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            {stats.map(stat => (
                <div key={stat.id} id={stat.id.toString()}
                     className="bg-tertiari hover:bg-tertiari-light overflow-hidden shadow rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="text-sm font-medium text-quaternary truncate">{stat.title}</div>
                        <div className="mt-1 text-3xl font-semibold text-quaternary text-center"
                             id={stat.value.toString()}>{stat.value}</div>
                        <div className="w-full flex justify-end mt-5">
                            {stat.button}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default stats;
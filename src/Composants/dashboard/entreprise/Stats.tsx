import {DataToken, Pricing} from "../../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import Button from "../../../ComposantsCommun/Button.tsx";
import {useAuthContext} from "../../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {postElementByEndpoint} from "../../../Helpers/apiHelper.ts";

interface StatsProps {
    lastCommande: Pricing;
    submitCount: number;
    nbPuzzlesPlayed: number;
    nbPuzzleCreated: number;
    setShowNotification: (value: boolean) => void;
    setNotificationType: (value: string) => void;
    setNotificationMessage: (value: string) => void;
}

const stats = ({
                   lastCommande,
                   nbPuzzlesPlayed,
                   nbPuzzleCreated,
                   setShowNotification,
                   setNotificationMessage,
                   setNotificationType
               }: StatsProps) => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;

    function handleClick() {
        postElementByEndpoint('entreprise/unsuscribe', {
            data: {userId: infos?.data?.id},
            token: authContext.accessToken ?? ""
        }).then(async (repsonse) => {
            const res = await repsonse.json();
            if (res.statusCode === 201) {
                setNotificationMessage(t('abonementSuccess'));
                setNotificationType('success');
                setShowNotification(true);
            }
            if (repsonse.status === 400) {
                setNotificationMessage(t('abonementError'));
                setNotificationType('error');
                setShowNotification(true);
            }
        })
    }

    const stats = [
        {
            id: 1,
            title: t("abonnement"),
            value: lastCommande?.title,
            button: <Button type={"button"} className="bg-gris-chaud text-tertiari p-1 rounded-lg" id={"unscribed"}
                            onClick={handleClick}> {t("unscribed")} </Button>
        },
        {id: 2, title: t("nbTestCreate"), value: nbPuzzleCreated + "/" + (lastCommande?.nbCreateTest)},
        {id: 3, title: t("nbTestRealized"), value: nbPuzzlesPlayed}
    ];

    return (
        <div className="font-sans m-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
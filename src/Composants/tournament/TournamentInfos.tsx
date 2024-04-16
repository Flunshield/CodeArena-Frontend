import {DataToken, Tournament} from "../../Interface/Interface.ts";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getElementByEndpoint, postElementByEndpoint, unsubscribeTournament} from "../../Helpers/apiHelper.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import {formatDate} from "../../Helpers/formatHelper.ts";
import Button from "../../ComposantsCommun/Button.tsx";

function tournamentInfos() {
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    const {t} = useTranslation();
    const data = {token: authContext.accessToken ?? ""}
    const {id} = useParams<{ id: string }>();
    const [infosTournament, setInfosTournament] = useState<Tournament>()
    const getTournament = getElementByEndpoint('tournament/findTournament?id=' + id, {token: data.token, data: ""});
    const [isRegistered, setIsRegistered] = useState<boolean>();
    const [canSubscribe, setCanSubscribe] = useState<boolean>(true);


    const handleClickRegistered = () => {
        postElementByEndpoint('tournament/inscription', {
            token: authContext.accessToken ?? "",
            data: {
                userID: infosUser?.sub,
                tournamentID: infosTournament?.id,
                points: infos?.data?.userRanking?.[0]?.points ?? 0
            }
        }).then(response => {
            if (response.status === 201) {
                setIsRegistered(true)
            } else {
                window.alert(t('inscriptionFail'));
            }
        });
    }

    const handleClickUnsubscribe = () => {
        unsubscribeTournament('tournament/unsubscribe', {
            token: authContext.accessToken ?? "",
            userID: infosUser?.sub,
            tournamentID: infosTournament?.id
        }).then(response => {
            if (response.status === 200) {
                setIsRegistered(false)
            } else {
                window.alert(t('unsubscribeFail'));
            }
        });
    }

    useEffect(() => {
        getTournament.then(async (response) => {
            const result = await response.json();
            setInfosTournament(result);
            if (result) {
                infos?.data.userTournament?.find((tournament) => {
                    if (tournament?.tournamentID === parseInt(id ?? "")) {
                        setIsRegistered(true)
                    } else {
                        setIsRegistered(false)
                    }
                });
            }
        });
        if (infosTournament && (infosTournament?.numberRegistered >= infosTournament?.playerMax)) {
            setCanSubscribe(false)
        }
    }, [isRegistered]);

    return (

        <div className="m-16 lg:m-56">
            <Card className="border-white bg-secondary">
                <CardContent>
                    <ul className="text-white flex flex-col">
                        <li className="text-3xl text-center font-bold">{infosTournament?.title}</li>
                        <div className="mt-10 flex flex-col md:flex-row justify-around text-2xl">
                            <div className="flex flex-col text-center">
                                <p className="mr-3 mb-3">{t("dateDebut")}</p>
                                <li className="text-green-600 font-bold">{formatDate(infosTournament?.startDate, t)}</li>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="mr-3 mb-3">{t("dateFin")}</p>
                                <li className="text-error font-bold">{formatDate(infosTournament?.endDate, t)}</li>
                            </div>
                        </div>
                        <div className="flex flex-col text-center mt-10 mb-10">
                            <p className="mr-3 mb-3 text-3xl">{t("maxPlayer")}</p>
                            <li className="text-5xl font-bold">{infosTournament?.numberRegistered + "/" + infosTournament?.playerMax}</li>
                        </div>
                        <div className="mb-10">
                            <p className="mr-3 mb-3 text-3xl">{t("rules")}</p>
                            <li>{infosTournament?.description}</li>
                        </div>
                        <div className="flex justify-center">
                            {canSubscribe &&
                                (isRegistered ?
                                        <Button type="button" id="inscription" onClick={handleClickUnsubscribe}
                                                className="border-2 border-white rounded-xl p-3 font-bold text-2xl">
                                            {t("unsubscribe")}
                                        </Button>
                                        :
                                        <Button type="button" id="inscription" onClick={handleClickRegistered}
                                                className="border-2 border-white rounded-xl p-3 font-bold text-2xl">
                                            {t("inscription")}
                                        </Button>
                                )
                            }
                        </div>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

export default tournamentInfos;
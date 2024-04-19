import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";

function Badges(): JSX.Element {
    const authContext = useAuthContext();
    const {t} = useTranslation();

    // Obligé de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const badges: string[] = infos.data.badgesWin ?? [];

    return (
        (
            badges.length > 0 && (
                <div className="flex flex-col ml-5">
                    <p className={"text-2xl font-bold text-tertiari"}>{t("yourBadges")}</p>

                    <div className="flex flex-wrap m-5">
                        {badges.map((badge, index) => (
                            <div key={index}>
                                <img src={`/assets/badges/${badge}`} alt="badge" title={badge}
                                     className="rounded-full w-20 h-20 border-2 border-tertiari m-5"/>
                            </div>
                        ))}
                    </div>
                </div>
            )
        )
    ) as JSX.Element;
}

export default Badges;

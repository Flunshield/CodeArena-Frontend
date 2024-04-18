import { useAuthContext } from "../../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { DataToken } from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";

function Badges(): JSX.Element {
    const authContext = useAuthContext();
    const {t} = useTranslation();

    // Obligé de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const badges: string[] = infos.data.badgesWin ?? [];

    return (
        <div className="flex flex-col ml-20 lg:ml-40 mt-10">
            <p className={"text-2xl font-bold text-white"}>{t("yourBadges")}</p>

            {badges.length > 0 && (
            <div className="flex flex-wrap mt-5">
                {badges.map((badge, index) => (
                    <div key={index} className="flex flex-col">
                        <img src={`/assets/badges/${badge}`} alt="badge" title={badge}
                             className="rounded-full w-20 h-20 border-2 border-white m-5"/>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default Badges;

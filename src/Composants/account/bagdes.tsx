import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import clsx from "clsx";

function Badges(): JSX.Element {
    const authContext = useAuthContext();
    const {t} = useTranslation();

    // Obligé de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const badges: string[] = infos.data.badgesWin ?? [];

    return (
            <div className="flex flex-col w-full">
                <p className="text-2xl font-bold text-tertiary">{t("yourBadges")}</p>
                <div className={clsx(badges.length > 0 ? " border-2 border-tertiary rounded-lg overflow-auto " : "", "flex flex-wrap m-5")}>
                    {badges.length > 0 ? (
                    badges.map((badge, index) => (
                        <div key={index}>
                            <img
                                src={`/assets/badges/${badge}`}
                                alt="badge"
                                title={badge}
                                className="rounded-full w-20 h-20 border-2 border-tertiary m-5"
                            />
                        </div>
                    ))
                    ) : (
                        <p className="text-tertiary text-center">{t("noBadges")}</p>
                    )}
                </div>
            </div>
    ) as JSX.Element;
}

export default Badges;

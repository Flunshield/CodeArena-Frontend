import {User} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import clsx from "clsx";

interface badgesProps {
    infosUserById: User;
}

function Badges({infosUserById}: badgesProps): JSX.Element {
    const {t} = useTranslation();

    const badges = infosUserById.badgesWin ?? [];

    return (
        <div className="flex flex-col w-full">
            <p className="text-2xl font-bold text-tertiary">{t("yourBadges")}</p>
            <div
                className={clsx(badges.length > 0 ? " border-2 border-tertiary rounded-lg overflow-auto " : "", "flex flex-wrap m-5")}>
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

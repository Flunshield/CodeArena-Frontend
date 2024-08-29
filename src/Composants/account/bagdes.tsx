import {User} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import { Container } from "../../ComposantsCommun/Container";
import { FadeIn, FadeInStagger } from "../../ComposantsCommun/FadeIn";

interface badgesProps {
    infosUserById: User;
}

function Badges({infosUserById}: badgesProps): JSX.Element {
    const {t} = useTranslation();

    const badges = infosUserById.badgesWin ?? [];

    return (
        <Container className="bg-primary">
            <FadeInStagger>
                <FadeIn >
                    <div className="flex flex-col items-center w-full">
                        <p className="text-2xl font-bold text-neutral-900 mb-4">{t("yourBadges")}</p>
                        <div className={clsx(badges.length > 0 ? "border-2 border-neutral-300 rounded-lg overflow-auto p-5" : "", "flex flex-wrap justify-center")}>
                            {badges.length > 0 ? (
                                badges.map((badge, index) => (
                                    <div key={index} className="m-2">
                                        <img
                                            src={`/assets/badges/${badge}`}
                                            alt="badge"
                                            title={badge}
                                            className="rounded-full w-20 h-20 border-2 border-neutral-300"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-neutral-900 text-center">{t("noBadges")}</p>
                            )}
                        </div>
                    </div>
                </FadeIn>
            </FadeInStagger>
        </Container>
    );
}

export default Badges;

import {useTranslation} from "react-i18next";
import {Tournament} from "../../Interface/Interface";
import Card from "../../ComposantsCommun/Card";
import CardContent from "../../ComposantsCommun/CardContent";
import clsx from "clsx";
import {FadeIn} from "../../ComposantsCommun/FadeIn";

interface TableauTournamentProps {
    infosTournament: Tournament[];
    className?: string;
}

function TableauTournament({className, infosTournament}: TableauTournamentProps): JSX.Element {
    const {t} = useTranslation();

    return (
        <Card
            className={clsx(className, "border-2 border-tertiary shadow-lg bg-secondary rounded-lg p-4 md:p-6 lg:p-8")}>
            <CardContent className="text-tertiari">
                <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl" id="title-futurTournament">
                    {t("futurTournament")}
                </p>
            </CardContent>
            <FadeIn>
                {infosTournament && infosTournament.length > 0 ? (
                <p>TODO: AFFICHER LES TOURNOIS ICI</p>
                ) : (
                    <p className="font-bold text-secondary text-lg sm:text-xl md:text-2xl m-3 sm:m-5 md:m-6 pt-5 border-t-2">
                        {t("noTournament")}
                    </p>
                )}
            </FadeIn>
        </Card>

    );
}

export default TableauTournament;

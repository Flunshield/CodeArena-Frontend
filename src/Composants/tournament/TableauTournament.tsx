
import { useTranslation } from "react-i18next";
import { Tournament } from "../../Interface/Interface";
import Card from "../../ComposantsCommun/Card";
import CardContent from "../../ComposantsCommun/CardContent";
import clsx from "clsx";
import { FadeIn } from "../../ComposantsCommun/FadeIn";

import CalendarTournament from "../../ComposantsCommun/Calendar";

interface TableauTournamentProps {
    infosTournament: Tournament[];
    className?: string;
}

function TableauTournament({ className, infosTournament }: TableauTournamentProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <Card className={clsx(className, "border-2 border-tertiary shadow-lg bg-secondary rounded-lg")}>
        <CardContent className="text-tertiari">
            <p className="font-bold text-2xl lg:text-5xl" id="title-futurTournament">{t("futurTournament")}</p>
        </CardContent>
        <FadeIn>
            {infosTournament && infosTournament.length > 0 ? (
                <CalendarTournament infosTournament={infosTournament} /> 
            ) : (
                <p className="font-bold text-secondary text-xl m-5 pt-5 border-t-2">{t("noTournament")}</p>
            )}
        </FadeIn>
    </Card>
    );
}

export default TableauTournament;

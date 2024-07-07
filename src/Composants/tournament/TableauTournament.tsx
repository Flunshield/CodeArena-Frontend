import { useTranslation } from "react-i18next";
import { Tournament } from "../../Interface/Interface.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import { formatDate } from "../../Helpers/formatHelper.ts";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { FadeIn } from "../../ComposantsCommun/FadeIn.tsx";

interface TableauTournamentProps {
    infosTournament: Tournament[];
    isImg: boolean;
    className?: string;
}

function TableauTournament(value: TableauTournamentProps): JSX.Element {
    const { className, infosTournament } = value;
    const { t } = useTranslation();

    return (
      
        <Card className={clsx(className, "border-2 border-tertiary shadow-lg bg-secondary rounded-lg")}>
            <CardContent className="text-tertiari">
                <p className="font-bold text-2xl lg:text-5xl" id="title-futurTournament">{t("futurTournament")}</p>
            </CardContent>
            <FadeIn>
            {infosTournament && infosTournament.length > 0 ? (
                infosTournament.map((item: Tournament, index: number) => (
                    <Card key={index} className="  rounded-xl m-5 border-tertiari shadow-md">
                        <CardContent className="text-tertiari p-5">
                            <div className="flex flex-col">
                                <p className="font-bold text-2xl mb-5">{item.title}</p>
                                <p className="mb-3">{formatDate(item.startDate, t)}</p>
                                <p className="text-tertiari text-justify">{item.description}</p>
                                <div className="flex items-center mt-5">
                                    <Link to={"/tournament/" + item.id} className="uppercase text-red-600 font-bold hover:underline mr-2">{t("seeMore")}</Link>
                                    <img src="/assets/arrowRightRed.svg" className="h-5 mt-0.5" alt="flèche rouge"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="font-bold text-tertiari text-xl m-5 pt-5 border-t-2">{t("noTournament")}</p>
            )}
            </FadeIn>
        </Card>
    );
}

export default TableauTournament;

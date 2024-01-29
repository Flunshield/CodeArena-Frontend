import {useTranslation} from "react-i18next";
import {Tournament} from "../../Interface/Interface.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import arrowRight from "../../assets/arrowRightRed.svg";
import {formatDate} from "../../Helpers/formatHelper.ts";

interface TableauTournamentProps {
    infosTournament: Tournament | undefined
}

function TableauTournament(value: TableauTournamentProps) {
    const {t} = useTranslation();
    const infosTournament = value.infosTournament;

    return (
        <Card className="rounded-xl border-white bg-secondary">
            <CardContent className="text-white">
                <p className="font-bold text-5xl" id="title-futurTournament">{t("futurTournament")}</p>
            </CardContent>
            {infosTournament ?
                <Card className="rounded-xl m-5 border-white">
                    <CardContent className="text-white p-5">
                        <div className="flex flex-col ">
                            <p className="font-bold text-2xl mb-10">{infosTournament?.title}</p>
                            <p className="mb-1">{formatDate(infosTournament?.startDate, t)}</p>
                            <p className="text-gray-600 max-w-lg text-justify">{infosTournament?.description}</p>
                            <div className="flex content-baseline mt-5 hover:underline">
                                <a href={"/tournament/" + infosTournament?.id}
                                   className="uppercase text-red font-bold mr-2">{t("seeMore")}</a>
                                <img src={arrowRight} className="h-5 mt-0.5" alt="flèche rouge"/>

                            </div>
                        </div>
                    </CardContent>
                </Card>
                :
                <p className="font-bold text-white text-xl m-5 pt-5 border-t-2">{t("noTournament")}</p>
            }
        </Card>
    )
}

export default TableauTournament;
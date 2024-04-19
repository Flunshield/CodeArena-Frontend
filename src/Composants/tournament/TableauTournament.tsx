import {useTranslation} from "react-i18next";
import {Tournament} from "../../Interface/Interface.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import {formatDate} from "../../Helpers/formatHelper.ts";
import {Link} from "react-router-dom";

interface TableauTournamentProps {
    infosTournament: Tournament[]
    isImg: boolean
}

function TableauTournament(value: TableauTournamentProps) {
    const {t} = useTranslation();
    const infosTournament = value.infosTournament;
    // const displayImg = value.isImg; => Pour quand on aura des images à afficher

    return (
        <Card className="rounded-xl border-tertiari bg-secondary">
            <CardContent className="text-tertiari">
                <p className="font-bold text-5xl" id="title-futurTournament">{t("futurTournament")}</p>
            </CardContent>
            {infosTournament.length > 0 ?
                infosTournament.map((item: Tournament, index: number) => (
                    <Card key={index} className="rounded-xl m-5 border-tertiari">
                        <CardContent className="text-tertiari p-5">
                            <div className="flex flex-col ">
                                <p className="font-bold text-2xl mb-10">{item.title}</p>
                                <p className="mb-1">{formatDate(item.startDate, t)}</p>
                                <p className="text-gray-600 max-w-lg text-justify">{item.description}</p>
                                <div className="flex content-baseline mt-5 hover:underline">
                                    <Link to={"/tournament/" + item.id}
                                          className="uppercase text-red font-bold mr-2">{t("seeMore")}</Link>
                                    <img src="/assets/arrowRightRed.svg" className="h-5 mt-0.5" alt="flèche rouge"/>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
                :
                <p className="font-bold text-tertiari text-xl m-5 pt-5 border-t-2">{t("noTournament")}</p>
            }
        </Card>
    )
}

export default TableauTournament;
import {Event} from "../../Interface/Interface.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import {useTranslation} from "react-i18next";
import {formatDate} from "../../Helpers/formatHelper.ts";

interface TableauEventProps {
    infosEvents: Event[] | undefined
}

function TableauEvent(value: TableauEventProps) {
    const infosEvent = value.infosEvents
    const {t} = useTranslation();

    return (
        <Card className="rounded-xl mt-32 ml-32 w-2/4 h-3/4 border-white bg-secondary">
            <CardContent className="bg-secondary text-white text-center">
                <p className="font-bold text-5xl" id="title-event">{t("event")}</p>
            </CardContent>
            {infosEvent && infosEvent?.length > 0 ?
            infosEvent?.map((item: Event, index: number) => (
                <CardContent key={index} className="bg-secondary text-white border-2 rounded-lg m-5">
                    <p className="text-3xl font-bold mb-10">{item.title}</p>
                    <p className="text-xl mb-5"><span
                        className="font-bold">{t("date")} </span>{formatDate(item.startDate, t)}</p>
                    <p className="text-xl mb-2"><span
                        className="font-bold">Le nombre de joueurs maximum : </span>{item.playerMax}</p>
                    <p className="text-gray-300">{item.description}</p>
                </CardContent>))
                :
                <CardContent className="bg-secondary text-white border-2 rounded-lg m-5 flex justify-center">
                    <p className="text-3xl font-bold mb-10 mt-10">{t("noEvent")}</p>
                </CardContent>
            }
        </Card>
    )
}

export default TableauEvent;
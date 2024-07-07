import { Event } from "../../Interface/Interface.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../Helpers/formatHelper.ts";
import { FadeIn, FadeInStagger } from "../../ComposantsCommun/FadeIn.tsx";
import { Container } from "../../ComposantsCommun/Container.tsx";

interface TableauEventProps {
    infosEvents: Event[];
    isImg: boolean;
    className?: string;
}

function TableauEvent({ infosEvents, className }: TableauEventProps) {
    const { t } = useTranslation();

    return (
        <Container>
            <Card className={`rounded-xl shadow-lg ${className}`}>
                <CardContent className="bg-secondary text-tertiari text-center pb-6">
                    <p className="font-bold text-2xl lg:text-5xl" id="title-event">{t("event")}</p>
                </CardContent>
                {infosEvents && infosEvents.length > 0 ? (
                    <FadeInStagger className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {infosEvents.map((item: Event, index: number) => (
                            <FadeIn key={index} className="flex flex-col items-center">
                                <Card className="bg-tertiari rounded-xl m-5 border-tertiary shadow-md">
                                    <CardContent className="text-secondary p-5">
                                        <div className="flex flex-col items-center">
                                            <p className="font-bold text-2xl mb-5">{item.title}</p>
                                            <p className="mb-3">{formatDate(item.startDate, t)}</p>
                                            <p className="text-secondary  text-justify">{item.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </FadeIn>
                        ))}
                    </FadeInStagger>
                ) : (
                    <CardContent className="bg-secondary text-tertiari border-2 rounded-lg m-5 flex justify-center">
                        <p className="text-3xl font-bold mb-10 mt-10">{t("noEvent")}</p>
                    </CardContent>
                )}
            </Card>
        </Container>
    );
}

export default TableauEvent;

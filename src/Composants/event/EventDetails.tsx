import { Event } from "../../Interface/Interface.ts";
import { useTranslation } from "react-i18next";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import { formatDate } from "../../Helpers/formatHelper.ts";
import { Container } from "../../ComposantsCommun/Container.tsx";
import { FadeIn, FadeInStagger } from "../../ComposantsCommun/FadeIn.tsx";

interface TableauEventProps {
    infosEvents: Event[];
    isImg: boolean;
    className?: string;
}

function EventDetails({ infosEvents, }: TableauEventProps) {
    const { t } = useTranslation();
    

    return (
        <Container className="px-4 sm:px-6 md:px-8 lg:px-12">
            {infosEvents && infosEvents.length > 0 ? (
                <FadeInStagger
                    className={`mt-6 sm:mt-8 lg:mt-10 grid gap-6 ${infosEvents.length === 1
                        ? "grid-cols-1"
                        : infosEvents.length === 2
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        }`}
                >
                    {infosEvents.map((event: Event, index: number) => (
                        <FadeIn key={index} className="flex flex-col items-center">
                            <Card className="border-2 border-tertiary shadow-lg bg-tertiari rounded-lg w-full">
                                <CardContent className="text-neutral-900 p-8">
                                    <ul className="flex flex-col items-center">
                                        <li className="text-neutral-900 text-3xl text-center font-bold mb-6">
                                            {event.title}
                                        </li>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                            <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg">
                                                <p className="mb-2">{t("dateDebut")}</p>
                                                <p className="text-green-600 font-bold">{formatDate(event?.startDate, t)}</p>
                                            </div>
                                            <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg">
                                                <p className="mb-2">{t("dateFin")}</p>
                                                <p className="text-red-600 font-bold">{formatDate(event?.endDate, t)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center p-4 bg-neutral-100 shadow-md rounded-lg mt-4 mb-6 w-full">
                                            <p className="mb-2 text-3xl">{t("maxPlayer")}</p>
                                            <p className="text-5xl font-bold">{event?.numberRegistered}/{event?.playerMax}</p>
                                        </div>
                                        <div className="mb-6 text-center">
                                            <p className="mb-2 text-3xl">{t("rules")}</p>
                                            <p>{event?.description}</p>
                                        </div>
                                        {/* <div className="flex justify-center">
                                {canSubscribe && isUser && (
                                    isRegistered ? (
                                        <Button
                                            type="button"
                                            id="inscription"
                                            onClick={handleClickUnsubscribe}
                                            className="border-2 border-tertiary bg-neutral-200 hover:bg-neutral-300 rounded-xl p-3 font-bold text-2xl shadow-md"
                                        >
                                            {t("unsubscribe")}
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            id="inscription"
                                            onClick={handleClickRegistered}
                                            className="border-2 border-tertiary bg-neutral-200 hover:bg-neutral-300 rounded-xl p-3 font-bold text-2xl shadow-md"
                                        >
                                            {t("inscription")}
                                        </Button>
                                    )
                                )}
                            </div> */}
                                    </ul>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </FadeInStagger>
            ) : (
                <CardContent className="bg-secondary text-tertiari border-2 rounded-lg m-4 sm:m-6 md:m-8 lg:m-10 flex justify-center items-center">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                        {t("noEvent")}
                    </p>
                </CardContent>
            )}
        </Container>
    );
}

export default EventDetails;

// Path: src/Components/TableauEvent.tsx

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

function AllEvent({ infosEvents, className }: TableauEventProps) {
    const { t } = useTranslation();

    return (
        <Container className="px-4 sm:px-6 md:px-8 lg:px-12">
        <Card className={`rounded-xl shadow-lg ${className}`}>
          <CardContent className="bg-secondary text-tertiari text-center pb-6">
            <p className="font-bold text-lg sm:text-2xl lg:text-4xl" id="title-event">
              {t("event")}
            </p>
          </CardContent>
          {infosEvents && infosEvents.length > 0 ? (
            <FadeInStagger
              className={`mt-6 sm:mt-8 lg:mt-10 grid gap-6 ${
                infosEvents.length === 1
                  ? "grid-cols-1"
                  : infosEvents.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {infosEvents.map((item: Event, index: number) => (
                <FadeIn key={index} className="flex flex-col items-center">
                  <Card className="bg-tertiari rounded-xl m-3 sm:m-4 lg:m-5 border-tertiary shadow-md w-full">
                    <CardContent className="text-secondary p-4 sm:p-5">
                      <div className="flex flex-col items-center">
                        <p className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-4 lg:mb-6">
                          {item.title}
                        </p>
                        <p className="mb-2 sm:mb-3 lg:mb-4">{formatDate(item.startDate, t)}</p>
                        <p className="text-secondary text-justify text-sm sm:text-base lg:text-lg">
                          {item.description}
                        </p>
                      </div>
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
        </Card>
      </Container>
      
      
    );
}

export default AllEvent;

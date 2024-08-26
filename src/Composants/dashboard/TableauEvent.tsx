import { Event } from "../../Interface/Interface.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import { useTranslation } from "react-i18next";
import { FadeInStagger } from "../../ComposantsCommun/FadeIn.tsx";
import { Container } from "../../ComposantsCommun/Container.tsx";
import CalendarEvent from "../../ComposantsCommun/Calendar.tsx";

interface TableauEventProps {
  infosEvents: Event[];
  isImg: boolean;
  className?: string;
}

function TableauEvent({ infosEvents, className }: TableauEventProps) {
  const { t } = useTranslation();

  return (
    <Container className="px-4 md:px-8 lg:px-12">
      <Card
        className={`border-2 border-tertiary shadow-lg bg-secondary rounded-lg p-4 md:p-6 lg:p-8 ${className}`}
      >
        <CardContent className="bg-secondary text-tertiari text-center pb-6">
          <p className="font-bold text-xl sm:text-2xl lg:text-5xl" id="title-event">
            {t("event")}
          </p>
        </CardContent>
        {infosEvents && infosEvents.length > 0 ? (
          <div className="flex justify-center items-center">
            {/* Centrer le calendrier */}
            <div className="w-full max-w-4xl">
              <FadeInStagger className="mt-10">
                <CalendarEvent infosEvents={infosEvents} />
              </FadeInStagger>
            </div>
          </div>
        ) : (
          <CardContent className="bg-secondary text-tertiari border-2 rounded-lg m-5 flex justify-center items-center">
            <p className="text-xl sm:text-2xl font-bold mb-5 sm:mb-10 mt-5 sm:mt-10">
              {t("noEvent")}
            </p>
          </CardContent>
        )}
      </Card>
    </Container>
  );
}

export default TableauEvent;

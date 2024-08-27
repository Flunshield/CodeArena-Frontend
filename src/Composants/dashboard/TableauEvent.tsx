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

function TableauEvent({ infosEvents }: TableauEventProps) {
  const { t } = useTranslation();

  return (
    <Container className="px-4 sm:px-6 md:px-8 lg:px-12">
    <Card className="border-2 border-tertiary shadow-lg bg-secondary rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
      <CardContent className="bg-secondary text-tertiari text-center pb-6">
        <p className="font-bold text-lg sm:text-xl md:text-3xl lg:text-5xl" id="title-event">
          {t("event")}
        </p>
      </CardContent>
      {infosEvents && infosEvents.length > 0 ? (
        <div className="flex justify-center items-center">
          <div className="w-full max-w-5xl lg:max-w-7xl">
            <FadeInStagger className="mt-6 sm:mt-8 lg:mt-10">
              <CalendarEvent infosEvents={infosEvents} />
            </FadeInStagger>
          </div>
        </div>
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

export default TableauEvent;

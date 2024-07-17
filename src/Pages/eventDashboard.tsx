import { useEffect, useState } from "react";
import Layout from "../ComposantsCommun/Layout.tsx";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { Event } from "../Interface/Interface.ts";
import TableauEvent from "../Composants/dashboard/TableauEvent.tsx";
import { Container } from "../ComposantsCommun/Container.tsx";
import { SectionIntro } from "../ComposantsCommun/SectionIntro";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import { FadeIn } from "../ComposantsCommun/FadeIn.tsx";

function EventDashboard() {
    const authContext = useAuthContext();
    const data = { token: authContext.accessToken ?? "" };
    const [infosEvent, setInfosEvent] = useState<Event[]>([]);
    const getAllEvents = getElementByEndpoint('evenement/findEvents', { token: data.token, data: "" });

    useEffect(() => {
        if (infosEvent.length === 0) {
            getAllEvents.then(async (response) => {
                const result = await response.json();
                setInfosEvent(result);
            });
        }
    }, [infosEvent.length, getAllEvents]);

    return (
        <Layout>
            <Container className="py-12 px-4 md:px-8 lg:px-12">
                <SectionIntro
                    title="Upcoming Events"
                    subtitle="Discover the latest events happening near you."
                    className="mb-8 text-center"
                />
                <FadeIn>
                    <Card className="bg-secondary shadow-elevated p-6 rounded-xl">
                        <CardContent>
                            <TableauEvent
                                infosEvents={infosEvent}
                                isImg={false}
                                className="m-5 rounded-xl border-tertiari p-5 h-full w-full bg-tertiary-light"
                            />
                        </CardContent>
                    </Card>
                </FadeIn>
            </Container>
        </Layout>
    );
}

export default EventDashboard;

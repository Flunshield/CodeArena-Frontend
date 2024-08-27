// Path: src/Components/EventDashboard.tsx

import { useEffect, useState } from "react";
import Layout from "../ComposantsCommun/Layout.tsx";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { Event } from "../Interface/Interface.ts";
import { Container } from "../ComposantsCommun/Container.tsx";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import { FadeIn } from "../ComposantsCommun/FadeIn.tsx";
import AllEvent from "../Composants/event/AllEvent.tsx";

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
            <Container className="py-8 px-4 sm:px-6 md:px-8 lg:px-12">
                <FadeIn>
                    <Card className="bg-secondary shadow-elevated p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl">
                        <CardContent>
                            <AllEvent
                                infosEvents={infosEvent}
                                isImg={false}
                                className="m-3 sm:m-5 md:m-6 lg:m-8 rounded-xl border-tertiari p-4 sm:p-5 md:p-6 lg:p-8 h-full w-full bg-tertiary-light"
                            />
                        </CardContent>
                    </Card>
                </FadeIn>
            </Container>
        </Layout>

    );
}

export default EventDashboard;

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
                console.log("Received events:", result); // Vérifiez les données reçues ici
                setInfosEvent(result);
            });
        }
    }, [infosEvent.length, getAllEvents]);

    return (
        <Layout>
            <Container className="py-12">
                <SectionIntro 
                    title="Upcoming Events" 
                    subtitle="Discover the latest events happening near you."
                    className="mb-8"
                />
                <FadeIn>
                    <Card className="bg-secondary shadow-elevated p-6">
                        <CardContent>
                            <TableauEvent 
                                infosEvents={infosEvent} 
                                isImg={false} 
                                className="m-5 rounded-xl border-tertiari p-5 h-full"
                            />
                        </CardContent>
                    </Card>
                </FadeIn>
            </Container>
        </Layout>
    );
}

export default EventDashboard;

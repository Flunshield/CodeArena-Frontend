import  { useEffect, useState } from "react";
import TableauTournament from "../Composants/tournament/TableauTournament.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { Tournament } from "../Interface/Interface.ts";
import { Container } from "../ComposantsCommun/Container.tsx";
import { SectionIntro } from "../ComposantsCommun/SectionIntro.tsx";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import { GridPattern } from "../ComposantsCommun/GridPattern.tsx";

function TournamentDashboard() {
    const authContext = useAuthContext();
    const data = { token: authContext.accessToken ?? "" };
    const [infosTournament, setInfosTournament] = useState<Tournament[]>([]);
    const getAllTournaments = getElementByEndpoint('tournament/findNextTenTournament', { token: data.token, data: "" });

    useEffect(() => {
        if (infosTournament.length === 0) {
            getAllTournaments.then(async (response) => {
                const result = await response.json();
                setInfosTournament(result);
            });
        }
    }, [infosTournament.length, getAllTournaments]);

    return (
        <Layout>
    
            <Container className="py-12">
            <GridPattern
                className="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
                yOffset={-256}
            />
                <SectionIntro 
                    title="Upcoming Tournaments" 
                    subtitle="Stay updated with the latest tournaments happening soon."
                    className="mb-8"
                />
                <Card className="bg-white shadow-elevated p-6">
                    <CardContent>
                        <TableauTournament 
                            infosTournament={infosTournament} 
                            isImg={true} 
                            className="border-0"
                        />
                    </CardContent>
                </Card>
            </Container>
        </Layout>
    );
}

export default TournamentDashboard;

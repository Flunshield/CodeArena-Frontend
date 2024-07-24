import Layout from "../ComposantsCommun/Layout.tsx";
import { Event, Tournament, userRangList } from "../Interface/Interface.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import TableauEvent from "../Composants/dashboard/TableauEvent.tsx";
import UserRank from "../Composants/dashboard/UserRank.tsx";
import TableauTournament from "../Composants/tournament/TableauTournament.tsx";
import { FadeIn, FadeInStagger } from "../ComposantsCommun/FadeIn.tsx";
import { Container } from "../ComposantsCommun/Container.tsx";
import { SectionIntro } from "../ComposantsCommun/SectionIntro";
import Button from "../ComposantsCommun/Button.tsx";


function Dashboard() {
    const authContext = useAuthContext();
    const [infosUserRank, setInfosUserRank] = useState<userRangList>();
    const [infosTournament, setInfosTournament] = useState<Tournament[]>([]);
    const [infosEvents, setInfosEvents] = useState<Event[]>([]);
    const infosUser = authContext?.infosUser as JwtPayload;
    const userId = infosUser?.sub as unknown as number;
    const data = { id: userId, token: authContext.accessToken ?? "" };
    const responsePromise = getElementByEndpoint('dashboard/checkDashboard?id=' + data.id, { token: data.token, data: "" });

    useEffect(() => {
        if (!infosUserRank) {
            responsePromise.then(async (response) => {
                const result = await response.json();
                setInfosUserRank(result.userRanking);
                setInfosTournament(result.tournament);
                setInfosEvents(result.events);
                setInfosTournament(result.tournament);
                setInfosEvents(result.events);
            });
        }
    }, [infosUserRank]);

    return (
        <>
            <Layout>
            
                <Container className="mt-12">
                    <SectionIntro title="Dashboard">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                            <p className="mb-4 md:mb-0">Bienvenue sur votre tableau de bord, où vous pouvez voir vos événements, classements et tournois.</p>
                            <Button className="bg-primary text-secondary rounded-lg py-3 px-6 shadow-lg hover:bg-yellow-500" type="button" id="game">
                                <a href="/ranked" className="text-center hover:text-cyan-800 text-secondary">
                                    Jouez Maintenant
                                </a>
                            </Button>
                        </div>
                    </SectionIntro>
                    <FadeInStagger className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
                        <FadeIn className="lg:col-span-2 xl:col-span-2">
                            <TableauEvent infosEvents={infosEvents} isImg={false} />
                        </FadeIn>
                        <FadeIn className="lg:col-span-2 xl:col-span-1">
                            <UserRank infosUserRank={infosUserRank} />
                        </FadeIn>
                        <FadeIn className="col-span-1 lg:col-span-2 xl:col-span-3 mb-4">
                            <TableauTournament infosTournament={infosTournament} isImg={false} />
                        </FadeIn>
                    </FadeInStagger>
                </Container>
            </Layout>
        </>
    );
}

export default Dashboard;

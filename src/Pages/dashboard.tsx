import Layout from "../ComposantsCommun/Layout.tsx";
import { Event, Tournament, userRangList } from "../Interface/Interface.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import TableauEvent from "../Composants/dashboard/TableauEvent.tsx";
import UserRank from "../Composants/dashboard/UserRank.tsx";
import TableauTournament from "../Composants/tournament/TableauTournament.tsx";
import { FadeIn } from "../ComposantsCommun/FadeIn.tsx";



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
        // On réalise la requête pour récupérer la liste des utilisateurs à afficher dans la section rang
        if (!infosUserRank) {
            responsePromise.then(async (response) => {
                const result = await response.json();
                setInfosUserRank(result.userRanking);
                setInfosTournament(result.tournament);
                setInfosEvents(result.events);
            });
        }
    }, [infosUserRank]);

    return (
        <Layout>
            <FadeIn duration={1.0}>
                <div className="flex flex-col xl:flex-row xl:justify-around">
                    <div className="m-5 rounded-xl border-tertiari bg-secondary p-5 h-full xl:w-full xl:mr-8">
                        <TableauEvent infosEvents={infosEvents} isImg={false} />
                    </div>
                    <div className="flex flex-col xl:w-1/3">
                        <div className="rounded-xl border-tertiari bg-secondary m-5 p-5">
                            <UserRank infosUserRank={infosUserRank} />
                        </div>
                        <div className="rounded-xl border-tertiari bg-secondary m-5 p-5">
                            <TableauTournament infosTournament={infosTournament} isImg={false} />
                        </div>
                    </div>
                </div>
            </FadeIn>
        </Layout>
    );
}

export default Dashboard;

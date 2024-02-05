import Layout from "../ComposantsCommun/Layout.tsx";
import {Event, Tournament, userRangList, UserRanking} from "../Interface/Interface.ts";
import {useAuthContext} from "../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {useEffect, useState} from "react";
import {infosDashboardRequest} from "../Helpers/apiHelper.ts";
import TableauEvent from "../Composants/dashboard/TableauEvent.tsx";
import UserRank from "../Composants/dashboard/UserRank.tsx";
import TableauTournament from "../Composants/dashboard/TableauTournament.tsx";

function Dashboard() {
    const authContext = useAuthContext();
    const [infosUserRank, setInfosUserRank] = useState<userRangList>()
    const [infosTournament, setInfosTournament] = useState<Tournament[]>([])
    const [infosEvents, setInfosEvents] = useState<Event[]>([])
    const infosUser = authContext?.infosUser as JwtPayload
    const userId = infosUser?.sub as unknown as number

    const data: UserRanking = {id: userId, token: authContext.accessToken}
    const responsePromise = infosDashboardRequest('dashboard/checkDashboard', data);

    useEffect(() => {
        // On réalise la requete pour récupérer la liste des utilisateurs a afficher dans la section rang
        if (!infosUserRank) {
            responsePromise.then(async (response) => {
                const result = await response.json();
                setInfosUserRank(result.userRanking);
                setInfosTournament([result.tournament])
                setInfosEvents(result.events)
            });
        }
    })

    return (
        <Layout>
            <div className="flex flex-col xl:flex-row">
                <TableauEvent infosEvents={infosEvents} isImg={false} className="mt-32 ml-32 w-2/4 h-3/4"/>
                <div className="m-32">
                    <UserRank infosUserRank={infosUserRank}/>
                    <TableauTournament infosTournament={infosTournament} isImg={false}/>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;

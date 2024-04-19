import Layout from "../ComposantsCommun/Layout.tsx";
import {Event, Tournament, userRangList} from "../Interface/Interface.ts";
import {useAuthContext} from "../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {useEffect, useState} from "react";
import {getElementByEndpoint} from "../Helpers/apiHelper.ts";
import TableauEvent from "../Composants/dashboard/TableauEvent.tsx";
import UserRank from "../Composants/dashboard/UserRank.tsx";
import TableauTournament from "../Composants/tournament/TableauTournament.tsx";

function Dashboard() {
    const authContext = useAuthContext();
    const [infosUserRank, setInfosUserRank] = useState<userRangList>()
    const [infosTournament, setInfosTournament] = useState<Tournament[]>([])
    const [infosEvents, setInfosEvents] = useState<Event[]>([])
    const infosUser = authContext?.infosUser as JwtPayload
    const userId = infosUser?.sub as unknown as number

    const data = {id: userId, token: authContext.accessToken ?? ""}
    const responsePromise = getElementByEndpoint('dashboard/checkDashboard?id=' + data.id, {token: data.token, data: ""});

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
            <div className="flex flex-col xl:flex-row xl:justify-center">
                <TableauEvent infosEvents={infosEvents} isImg={false} className="m-5 mt-32 rounded-xl border-tertiari bg-secondary p-5 h-full xl:mr-20"/>
                <div className="flex flex-col xl:mt-28">
                    <UserRank infosUserRank={infosUserRank} className="rounded-xl border-tertiari h-auto mb-16 m-5"/>
                    <TableauTournament infosTournament={infosTournament} isImg={false} className="rounded-xl border-tertiari m-5 bg-secondary"/>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;

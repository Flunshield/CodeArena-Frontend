import TableauTournament from "../Composants/tournament/TableauTournament.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";
import {getElementByEndpoint} from "../Helpers/apiHelper.ts";
import {useAuthContext} from "../AuthContext.tsx";
import {Tournament} from "../Interface/Interface.ts";
import {useEffect, useState} from "react";

function TournamentDashboard() {
    const authContext = useAuthContext();
    const data = {token: authContext.accessToken ?? ""}
    const [infosTournament, setInfosTournament] = useState<Tournament[]>([])
    const getAllTournaments = getElementByEndpoint('tournament/findNextTenTournament', {token: data.token, data: ""});

    useEffect(() => {
        if (infosTournament.length === 0) {
            getAllTournaments.then(async (response) => {
                const result = await response.json();
                setInfosTournament(result);
            });
        }
    }, []);

    return (
        <Layout>
            <div className="h-screen">
            <TableauTournament infosTournament={infosTournament} isImg={true}
                               className="border-0"></TableauTournament>
            </div>
        </Layout>
    );
}

export default TournamentDashboard;
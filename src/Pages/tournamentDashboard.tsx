import TableauTournament from "../Composants/dashboard/TableauTournament.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";
import {getElementByEndpoint} from "../Helpers/apiHelper.ts";
import {useAuthContext} from "../AuthContext.tsx";
import {Tournament} from "../Interface/Interface.ts";
import {useEffect, useState} from "react";

function TournamentDashboard() {
    const authContext = useAuthContext();
    const data = {token: authContext.accessToken ?? ""}
    const [infosTournament, setInfosTournament] = useState<Tournament[]>([])
    const getAllTournaments = getElementByEndpoint('tournament/findTournaments', data);

    useEffect(() => {
        if (!infosTournament) {
            getAllTournaments.then(async (response) => {
                const result = await response.json();
                setInfosTournament(result);
            });
        }
    }, []);

    return (
        <Layout>
            <div className="m-32 mb-64">
                <TableauTournament infosTournament={infosTournament} isImg={true}></TableauTournament>
            </div>
        </Layout>
    );
}

export default TournamentDashboard;
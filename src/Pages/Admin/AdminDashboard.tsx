import {useEffect, useState} from "react";
import Layout from "../../ComposantsCommun/Layout.tsx";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import {useAuthContext} from "../../AuthContext.tsx";
import {getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {Ranking, Titles} from "../../Interface/Interface.ts";
import ListTitle from "../../Composants/admin/ListTitle.tsx";
import ListRank from "../../Composants/admin/ListRank.tsx";
import ListUsers from "../../Composants/admin/ListUsers.tsx";
import PuzzleAdmin from "../../Composants/admin/puzzleAdmin.tsx";

function AdminDashboard() {
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? "";
    const [submitCount, setSubmitCount] = useState(0);
    const [titles, setTitles] = useState<Titles[]>([]);
    const [ranks, setRanks] = useState<Ranking[]>([]);
    const getTitle = getElementByEndpoint("user/getTitles", {token: token, data: ""});
    const getRank = getElementByEndpoint("admin/getRanks", {token: token, data: ""});

    useEffect(() => {
        getTitle.then(async (response) => {
            const result = await response.json();
            setTitles(result);
        });
        getRank.then(async (response) => {
            const result = await response.json();
            setRanks(result);
        });
    }, [submitCount]);

    return (
        <Layout>
            <div className="m-5">
                <Card className="bg-secondary text-tertiari">
                    <CardContent>
                        <h1 className="text-tertiari text-center text-3xl font-bold">Admin Dashboard</h1>
                        <PuzzleAdmin ranks={ranks} setIsSubmitted={() => setSubmitCount(count => count + 1)}
                                     className="text-gray-600"/>
                        <ListTitle titles={titles} setIsSubmitted={() => setSubmitCount(count => count + 1)}/>
                        <ListRank ranks={ranks}/>
                        <ListUsers setIsSubmitted={() => setSubmitCount(count => count + 1)} submitCount={submitCount}/>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}

export default AdminDashboard;

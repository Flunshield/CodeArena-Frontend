import React, {useEffect, useState} from "react";
import Layout from "../ComposantsCommun/Layout.tsx";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import {useAuthContext} from "../AuthContext.tsx";
import {getElementByEndpoint} from "../Helpers/apiHelper.ts";
import {Ranking, Titles, User} from "../Interface/Interface.ts";
import ListTitle from "../Composants/admin/ListTitle.tsx";
import ListRank from "../Composants/admin/ListRank.tsx";
import ListUsers from "../Composants/admin/ListUsers.tsx";

const AdminDashboard: React.FC = () => {
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? "";
    const [titles, setTitles] = useState<Titles[]>([]);
    const [ranks, setRanks] = useState<Ranking[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(0);
    const getTitle = getElementByEndpoint("user/getTitles", {token: token, data: ""});
    const getRank = getElementByEndpoint("admin/getRanks", {token: token, data: ""});
    const getUsers = getElementByEndpoint("admin/getUsers?page=" + page, {
        token: token,
        data: ""
    });

    const nbPageUser = users.length / 10; // permet de compter le nombre de page possible pour la pagination

    // Fonction pour gérer la pagination
    const handlePageClick = (selectedPage: { selected: number }) => {
        setPage(selectedPage.selected);
    };

    useEffect(() => {
        getTitle.then(async (response) => {
            const result = await response.json();
            setTitles(result);
        });
        getRank.then(async (response) => {
            const result = await response.json();
            setRanks(result);
        });
        getUsers.then(async (response) => {
            const result = await response.json();
            setUsers(result);
        });
    }, []);

    return (
        <Layout>
            <div className="m-32">
                <Card className="bg-secondary text-tertiari">
                    <CardContent>
                        <h1>Admin Dashboard</h1>
                        <Card className="mt-10">
                            <CardContent>
                                <ListTitle titles={titles} token={token}/>
                                <ListRank ranks={ranks}/>
                                <ListUsers users={users} handlePageClick={handlePageClick} nbPageUser={nbPageUser} token={token}/>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default AdminDashboard;

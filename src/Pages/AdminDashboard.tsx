import React, {useEffect, useState} from "react";
import Layout from "../ComposantsCommun/Layout.tsx";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../AuthContext.tsx";
import {deleteTitle, getElementByEndpoint} from "../Helpers/apiHelper.ts";
import {Ranking, Titles, User} from "../Interface/Interface.ts";
import ReactPaginate from "react-paginate";
import Button from "../ComposantsCommun/Button.tsx";
import FormTitre from "../Composants/admin/FormTitre.tsx";
import {useNavigate} from "react-router-dom";

const AdminDashboard: React.FC = () => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? "";
    const navigate = useNavigate();

    const [titles, setTitles] = useState<Titles[]>([]);
    const [ranks, setRanks] = useState<Ranking[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(0);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isType, setIsType] = useState(0);
    const [titleToUpdate, setTitleToUpdate] = useState<Titles>({id: 0, label: "", value: ""});
    const getTitle = getElementByEndpoint("user/getTitles", {token: token});
    const getRank = getElementByEndpoint("admin/getRanks", {token: token});
    const getUsers = getElementByEndpoint("admin/getUsers?page=" + page, {
        token: token,
    });

    const nbPageUser = users.length / 10; // permet de compter le nombre de page possible pour la pagination

    // Fonction pour gérer la pagination
    const handlePageClick = (selectedPage: { selected: number }) => {
        setPage(selectedPage.selected);
    };

    const openPopup = (type: number, title?: Titles) => {
        setPopupOpen(true);
        if (type === 1 && title !== undefined) {
            setTitleToUpdate(title)
        }
        setIsType(type)
    };

    const closePopup = async () => {
        setPopupOpen(false);
    };

    const deleteTitleFunction = async (title: Titles) => {
        await deleteTitle("admin/deleteTitle", {token: token, title: title});
        navigate(0);
    }

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
                <Card className="bg-secondary text-white">
                    <CardContent>
                        <h1>Admin Dashboard</h1>
                        <Card className="mt-10">
                            <CardContent>
                                <h2>Liste des titres</h2>
                                <div className="flex flex-row">
                                {titles.length > 0 ?
                                <ul className="flex flex-wrap">
                                    {titles.map((title: Titles) => (
                                        <li key={title.id}
                                            className="m-5 p-5 border-2 rounded-lg bg-zinc-800 flex flex-col">
                                            <p>
                                                Label du titre : <span className="font-bold">{title.label}</span>
                                            </p>
                                            <p>
                                                Valeur du titre : <span className="font-bold">{title.value}</span>
                                            </p>
                                            <div className="flex flex-row">
                                                <Button type="button" onClick={() => openPopup(1, title)}
                                                        className="border-2 bg-tertiari rounded-lg text-secondary p-2 mt-5 mr-5"
                                                        id="updateTitle">{t("update")}</Button>
                                                <Button type="button" onClick={() => deleteTitleFunction(title)}
                                                        className="border-2 bg-red rounded-lg text-secondary p-2 mt-5"
                                                        id="deleteTitle">{t("delete")}</Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                :
                                    <div className="m-5 p-5 border-2 rounded-lg bg-zinc-800 flex flex-col">
                                        <p>Pas de titre</p>
                                    </div>
                                }
                                <Button type="button" onClick={() => openPopup(2)}
                                        className="border-2 bg-tertiari rounded-lg text-secondary p-2 mt-5 mr-5"
                                        id="updateTitle">+</Button>
                                </div>
                                <h2>Liste des rangs</h2>
                                <ul className="flex flex-wrap">
                                    {ranks.map((ranks: Ranking) => (
                                        <li key={ranks.id} className="m-5 p-5 border-2 rounded-lg">
                                            <p>
                                                Label du rang : <span className="font-bold">{ranks.title}</span>
                                            </p>
                                            <p>
                                                Minimum de points : <span className="font-bold">{ranks.minPoints}</span>
                                            </p>
                                            <p>
                                                Maximum de points : <span className="font-bold">{ranks.maxPoints}</span>
                                            </p>
                                            <p>
                                                Description du rang : <span
                                                className="font-bold">{ranks.description}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <h2>Liste des utilisateurs</h2>
                                <div className="flex flex-col justify-center w-full">
                                    <ul className="flex flex-wrap">
                                        {users.map((user: User) => (
                                            <li key={user.id} className="m-5 p-5 border-2 rounded-lg bg-zinc-800">
                                                <p>Nom : {user.firstName}</p>
                                                <p>Prénom : {user.lastName}</p>
                                                <p>UserName : {user.userName}</p>
                                                <p>Rang actuel
                                                    : {user?.userRanking?.map((elem) => elem.rankings?.title)}</p>
                                                <p>Nombre de point
                                                    : {user?.userRanking?.map((elem) => elem.points)}</p>
                                                <p>Nombre de partie jouer : {user.nbGames}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="Suivant"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={10}
                                        pageCount={nbPageUser}
                                        previousLabel="Précedent"
                                        renderOnZeroPageCount={null}
                                        className="flex flex-row justify-around"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
            {isPopupOpen && (isType === 1 || isType === 2) && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90">
                    <div className="bg-secondary p-8 rounded-md flex flex-col">
                        <FormTitre onClose={closePopup} title={titleToUpdate} type={isType}/>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default AdminDashboard;

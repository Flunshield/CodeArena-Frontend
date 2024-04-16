import React from "react";
import {User} from "../../Interface/Interface.ts";
import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";
import {deleteUser, resetPointsUser} from "../../Helpers/apiHelper.ts";
import {useNavigate} from "react-router-dom";
import Button from "../../ComposantsCommun/Button.tsx";

interface ListTitleProps {
    users: User[];
    handlePageClick: (selectedPage: { selected: number }) => void;
    nbPageUser: number;
    token: string;
}

const ListUsers: React.FC<ListTitleProps> = (data) => {
    const {t} = useTranslation();
    const {users, handlePageClick, nbPageUser, token} = data;
    const navigate = useNavigate();

    const deleteTitleFunction = async (user: User) => {
        await deleteUser("admin/deleteUser", {token: token, user: user});
        navigate(0);
    }

    const resetPointsFunction = async (user: User) => {
        await resetPointsUser("admin/resetPoints", {token: token, user: user});
        navigate(0);
    }

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <div className="flex flex-col justify-center w-full">
                <ul className="flex flex-wrap">
                    {users.map((user: User) => (
                        <li key={user.id} className="m-5 p-5 border-2 rounded-lg bg-zinc-800">
                            <p>{t('firstName')} : {user.firstName}</p>
                            <p>{t('lastName')} : {user.lastName}</p>
                            <p>{t('userName')} : {user.userName}</p>
                            <p>{t('actualRank')}
                                : {user?.userRanking?.map((elem) => elem.rankings?.title)}</p>
                            <p>{t('pointNumber')}
                                : {user?.userRanking?.map((elem) => elem.points)}</p>
                            <p>{t('nbPlayingGame')} : {user.nbGames}</p>
                            <Button type="button" onClick={() => deleteTitleFunction(user)}
                                    className="border-2 bg-red rounded-lg text-secondary p-2 mt-5"
                                    id="deleteTitle">{t("delete")}
                            </Button>
                            <Button type="button" onClick={() => resetPointsFunction(user)}
                                    className="border-2 bg-red rounded-lg text-secondary p-2 mt-5"
                                    id="deleteTitle">{t("resetPoints")}
                            </Button>
                        </li>
                    ))}
                </ul>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={t('next')}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={10}
                    pageCount={nbPageUser}
                    previousLabel={t('previous')}
                    renderOnZeroPageCount={null}
                    className="flex flex-row justify-around"
                />
            </div>
        </div>
    )
}

export default ListUsers;
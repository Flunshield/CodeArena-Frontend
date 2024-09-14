import React, {useEffect, useState} from 'react';
import {listUserEntreprise, User} from '../../Interface/Interface.ts';
import {useTranslation} from 'react-i18next';
import {deleteUser, getElementByEndpoint, resetPointsUser} from '../../Helpers/apiHelper.ts';
import Button from '../../ComposantsCommun/Button.tsx';
import {useAuthContext} from '../../AuthContext.tsx';
import SearchBar from "../../ComposantsCommun/SearchBar.tsx";
import Pagination from "../../ComposantsCommun/Pagination.tsx";
import useUserInfos from "../../hook/useUserInfos.ts";

interface ListUsersProps {
    setIsSubmitted: () => void;
    submitCount: number;
}

const ListUsers: React.FC<ListUsersProps> = ({setIsSubmitted, submitCount}) => {
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? '';
    const {t} = useTranslation();
    const [users, setUsers] = useState<listUserEntreprise>({item: [], total: 0});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const userInfos = useUserInfos();
    const isAdmin = userInfos?.groups?.roles === 'admin';
    const getUsers = getElementByEndpoint(`user/getUsers?page=${currentPage}&itemPerPage=${itemPerPage}&isEntreprise=${isAdmin}`, {
        token,
        data: '',
    });

    const maxPage = Math.ceil(users.total / itemPerPage);

    const deleteUserFunction = async (user: User) => {
        const result = await deleteUser('admin/deleteUser', {token, user});
        if (result.status === 200) {
            setIsSubmitted();
        }
    };

    const resetPointsFunction = async (user: User) => {
        const result = await resetPointsUser('admin/resetPoints', {token, user});
        if (result.status === 200) {
            setIsSubmitted();
        }
    };

    async function onSearch(username: string) {
        const result = await getElementByEndpoint(`user/getUsersByUsername?username=${username}&itemPerPage=${itemPerPage}&isEntreprise=${isAdmin}`, {
            token,
            data: '',
        });
        setUsers(await result.json());
    }

    useEffect(() => {
        getUsers.then(async (response) => {
            const result = await response.json();
            setUsers(result);
        });
    }, [submitCount]);
    return (
        <div className="">
            <div className="flex flex-row justify-between">
                <h2 className="text-lg font-semibold text-tertiari mb-4">{t('listUtilisateurs')}</h2>
            </div>
            <SearchBar
                onSearch={onSearch}
                setItemPerPage={setItemPerPage}
                placeholder={t('serachByUsername')}
                setCurrentPage={setCurrentPage}
                isAdmin={isAdmin}
            />
            <div className="flex flex-col justify-center w-full">
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-secondary uppercase bg-tertiari dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                {t('firstName')}
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {t('lastName')}
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {t('userName')}
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {t('actualRank')}
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {t('pointNumber')}
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {t('nbPlayingGame')}
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.item.map((user: User) => (
                            <tr key={user.id} className="bg-tertiari border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-4 px-6">{user.firstName}</td>
                                <td className="py-4 px-6">{user.lastName}</td>
                                <td className="py-4 px-6">{user.userName}</td>
                                <td className="py-4 px-6">
                                    {user?.userRanking?.map((elem) => elem?.rankings?.title).join(', ')}
                                </td>
                                <td className="py-4 px-6">
                                    {user?.userRanking?.map((elem) => elem.points).join(', ')}
                                </td>
                                <td className="py-4 px-6">{user.nbGames}</td>
                                <td className="py-4 px-6">
                                    <div className="flex space-x-2 justify-center">
                                        <Button
                                            type="button"
                                            onClick={() => deleteUserFunction(user)}
                                            className="text-error font-medium py-2 px-4 rounded-lg mr-2"
                                            id="deleteUser"
                                        >
                                            {t('delete')}
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => resetPointsFunction(user)}
                                            className="text-petroleum-blue font-medium py-2 px-4 rounded-lg"
                                            id="resetPoints"
                                        >
                                            {t('resetPoints')}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    item={users.item}
                    maxPage={maxPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setSubmitCount={setIsSubmitted}
                    classNameCurrentPage="text-primary"
                    itemPerPage={itemPerPage}
                />
            </div>
        </div>
    );
};

export default ListUsers;
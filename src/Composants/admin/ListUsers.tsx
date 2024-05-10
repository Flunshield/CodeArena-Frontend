import React, { useState, useEffect } from 'react';
import { User } from '../../Interface/Interface.ts';
import { useTranslation } from 'react-i18next';
import { deleteUser, getElementByEndpoint, resetPointsUser } from '../../Helpers/apiHelper.ts';
import Button from '../../ComposantsCommun/Button.tsx';
import { useAuthContext } from '../../AuthContext.tsx';
import SearchBar from "../../ComposantsCommun/SearchBar.tsx";

interface ListUsersProps {
    setIsSubmitted: () => void;
    submitCount: number;
}

const ListUsers: React.FC<ListUsersProps> = ({ setIsSubmitted, submitCount }) => {
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? '';
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const getUsers = getElementByEndpoint(`user/getUsers?page=${currentPage}`, {
        token,
        data: '',
    });

    const deleteUserFunction = async (user: User) => {
        const result = await deleteUser('admin/deleteUser', { token, user });
        if (result.status === 200) {
            setIsSubmitted();
        }
    };

    const resetPointsFunction = async (user: User) => {
        const result = await resetPointsUser('admin/resetPoints', { token, user });
        if (result.status === 200) {
            setIsSubmitted();
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        setIsSubmitted();
    };

    const prevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
        setIsSubmitted();
    };

    async function onSearch(username: string) {
        const result = await getElementByEndpoint(`user/getUsersByUsername?page=${currentPage}&username=${username}`, {
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
            <h2 className="text-lg font-semibold text-tertiari mb-4">{t('Liste des utilisateurs')}</h2>
            <SearchBar onSearch={onSearch}/>
            </div>
            <div className="flex flex-col justify-center w-full">
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-secondary uppercase bg-tertiari dark:bg-gray-700 dark:text-gray-400">
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
                        {users.map((user: User) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                <div className="flex justify-between items-center w-full mt-4">
                    {currentPage > 1 ? (
                        <button
                            className="px-4 py-2 rounded bg-petroleum-blue text-white"
                            onClick={prevPage}
                        >
                            {t('previous')}
                        </button>
                    ) : (
                        <div className="px-4 py-2 invisible">{t('previous')}</div>
                    )}
                    <p className="text-center flex-grow">{currentPage}</p>
                    {users.length > 0 ? (
                        <button
                            className="px-4 py-2 rounded bg-petroleum-blue text-white"
                            onClick={nextPage}
                        >
                            {t('next')}
                        </button>
                    ) : (
                        <div className="px-4 py-2 invisible">{t('next')}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListUsers;
import { useAuthContext } from "../../AuthContext.tsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { User } from "../../Interface/Interface.ts";
import { getElementByEndpoint } from "../../Helpers/apiHelper.ts";
import SearchBar from "../../ComposantsCommun/SearchBar.tsx";
import DataTable from "../../ComposantsCommun/DataTable.tsx";

function Tableau(): JSX.Element {
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? '';
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>([]);
    const [submitCount, setSubmitCount] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const getUsers = getElementByEndpoint(`user/getUsers?page=${currentPage}`, {
        token,
        data: '',
    });
    async function onSearch(username: string) {
        const result = await getElementByEndpoint(`user/getUsersByUsername?page=${currentPage}&username=${username}`, {
            token,
            data: '',
        });
        setUsers(await result.json());
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        setSubmitCount(count => count + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
        setSubmitCount(count => count + 1);
    };

    useEffect(() => {
        getUsers.then(async (response) => {
            const result = await response.json();
            setUsers(result);
        });
    }, [submitCount]);

    const headers = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'userName', label: 'User Name' },
        { key: 'userRankingTitle', label: 'Actual Rank' },
        { key: 'userRankingPoints', label: 'Point Number' },
        { key: 'nbGames', label: 'Number of Games' },
    ];

    // Transform user data to fit the table headers
    const transformedData = users.map(user => ({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        userName: user.userName ?? "",
        userRankingTitle: user?.userRanking?.map(elem => elem?.rankings?.title).join(', ') ?? "",
        userRankingPoints: user?.userRanking?.map(elem => elem.points).join(', ') ?? "",
        nbGames: user.nbGames as string ?? "0",
    }));

    return (
        <div className="m-5">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-secondary mb-4 md:mb-0 shadow-lg bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-lg p-4">{t('Liste des utilisateurs')}</h2>
                <SearchBar onSearch={onSearch} setItemPerPage={setItemPerPage} placeholder={t('serachByUsername')} setCurrentPage={setCurrentPage} />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
                <DataTable headers={headers} data={transformedData} className="w-full" />
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
    );
}

export default Tableau;

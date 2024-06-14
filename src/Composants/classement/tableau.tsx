import {useAuthContext} from "../../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {DataToken, listUser, listUserEntreprise} from "../../Interface/Interface.ts";
import {getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import SearchBar from "../../ComposantsCommun/SearchBar.tsx";
import DataTable from "../../ComposantsCommun/DataTable.tsx";
import Pagination from "../../ComposantsCommun/Pagination.tsx";
import {JwtPayload} from "jwt-decode";
import {GROUPS} from "../../constantes/constantes.ts";

function Tableau(): JSX.Element {
    const authContext = useAuthContext();
    const token = authContext?.accessToken ?? '';
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const {t} = useTranslation();
    const isEntreprise = infos.data.groups.roles === GROUPS.ENTREPRISE;
    type UsersType = typeof infos.data.groups.roles extends typeof GROUPS.ENTREPRISE ? listUserEntreprise : listUser;
    const [users, setUsers] = useState<UsersType>({item: [], total: 0});
    const [submitCount, setSubmitCount] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState(10);

    async function getUsers() {
        return await getElementByEndpoint(`user/getUsers?page=${currentPage}&itemPerPage=${itemPerPage}&isEntreprise=${isEntreprise}`, {
            token,
            data: '',
        });
    }

    async function onSearch(username: string) {
        const result = await getElementByEndpoint(`user/getUsersByUsername?username=${username}&itemPerPage=${itemPerPage}&isEntreprise=${isEntreprise}`, {
            token,
            data: '',
        });
        setUsers(await result.json());
    }

    const headers = infos.data.groups.roles === GROUPS.ENTREPRISE ? [
        {key: 'firstName', label: 'firstName'},
        {key: 'lastName', label: 'lastName'},
        {key: 'email', label: 'email'},
        {key: 'userName', label: 'userName'},
        {key: 'userRankingTitle', label: 'userRanking'},
        {key: 'userRankingPoints', label: 'points'},
        {key: 'nbGames', label: 'nbGames'},
    ] : [
        {key: 'userName', label: 'userName'},
        {key: 'userRankingTitle', label: 'userRanking'},
        {key: 'userRankingPoints', label: 'points'},
        {key: 'nbGames', label: 'nbGames'},
    ]

// Transform user data to fit the table headers
    const transformedData = users.item.map(user => ({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        userName: user.userName ?? "",
        userRankingTitle: user?.userRanking?.map(elem => elem?.rankings?.title).join(', ') ?? "",
        userRankingPoints: user?.userRanking?.map(elem => elem.points).join(', ') ?? "",
        nbGames: user.nbGames as string ?? "0",
    }));
    const maxPage = Math.ceil(users.total / itemPerPage);

    useEffect(() => {
        getUsers().then(async (response) => {
                const result = await response.json();
                setUsers(result);
            }
        );
    }, [submitCount, itemPerPage, currentPage]);
    return (
        <div className="m-5">
            <div className="flex max-md:flex-col flex-row max-md:text-center justify-between">
                <h2 className="text-lg font-semibold text-tertiari mb-4">{t('Liste des utilisateurs')}</h2>
                <SearchBar onSearch={onSearch} setItemPerPage={setItemPerPage} placeholder={"serachByUsername"}
                           setCurrentPage={setCurrentPage}/>
            </div>
            <div className="flex flex-col justify-center w-full">
                <div className="overflow-x-auto rounded-lg">
                    {transformedData && transformedData.length === 0 ?
                        <p>{t('NoUserFound')}</p>
                        :
                        <DataTable headers={headers} data={transformedData}/>
                    }
                </div>
                <Pagination item={users.item} maxPage={maxPage} currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setSubmitCount={setSubmitCount} classNameCurrentPage="text-tertiari"
                            itemPerPage={itemPerPage}/>
            </div>
        </div>
    )
}

export default Tableau;
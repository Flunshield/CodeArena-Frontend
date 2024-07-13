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
import { Container } from "../../ComposantsCommun/Container.tsx";
import { SectionIntro } from "../../ComposantsCommun/SectionIntro.tsx";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import { FadeIn } from "../../ComposantsCommun/FadeIn.tsx";
import Notification from "../../ComposantsCommun/Notification.tsx";

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
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

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

    async function getPdf(idCv: number) {
        const response = await getElementByEndpoint(`entreprise/pdfCvUser?id=${infos.data.id}&idCv=${idCv}`, {
            token,
            data: '',
        });

        if (response.status === 200) {
            const result = await response.blob();
            const url = window.URL.createObjectURL(new Blob([result]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cv.pdf');
            document.body.appendChild(link);
            link.click();
        } else {
            setNotificationMessage(t('errorUserInfos'));
            setNotificationType('error');
            setShowNotification(true);
        }
    }

    const headers = infos.data.groups.roles === GROUPS.ENTREPRISE ? [
        {key: 'firstName', label: 'firstName'},
        {key: 'lastName', label: 'lastName'},
        {key: 'email', label: 'email'},
        {key: 'userName', label: 'userName'},
        {key: 'userRankingTitle', label: 'userRanking'},
        {key: 'userRankingPoints', label: 'points'},
        {key: 'nbGames', label: 'nbGames'},
        {key: 'actions', label: 'Cv'},
    ] : [
        {key: 'userName', label: 'userName'},
        {key: 'userRankingTitle', label: 'userRanking'},
        {key: 'userRankingPoints', label: 'points'},
        {key: 'nbGames', label: 'nbGames'},
    ]

// Transform user data to fit the table headers
    const transformedData = users.item.map(user =>
        ({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        userName: user.userName ?? "",
        userRankingTitle: user?.userRanking?.map(elem => elem?.rankings?.title).join(', ') ?? "",
        userRankingPoints: user?.userRanking?.map(elem => elem.points).join(', ') ?? "",
        nbGames: user.nbGames as string ?? "0",
        actions: user.cvUser && user.cvUser.length > 0 ? <button className="rounded-xl pr-5 pl-5 p-1 bg-olive-green text-tertiari" onClick={() => getPdf(user.cvUser[0].id)}>{t('getCv')}</button> : <button className="rounded-xl pr-5 pl-5 p-1 bg-soft-gray text-secondary cursor-default">{t('getCv')}</button>,
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
        <Container className="py-12">
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <SectionIntro
                title={t('listUtilisateurs')}
                subtitle={t('serachByUsername')}
                className="mb-8"
            />
            <FadeIn>
                <Card className="bg-white shadow-elevated p-6">
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-secondary mb-4 md:mb-0 shadow-lg bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-lg p-4">
                                {t('listUtilisateurs')}
                            </h2>
                            <SearchBar
                                onSearch={onSearch}
                                setItemPerPage={setItemPerPage}
                                placeholder={t('serachByUsername')}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <DataTable headers={headers} data={transformedData} className="w-full" />
                        </div>
                        <Pagination
                            item={users.item}
                            maxPage={maxPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setSubmitCount={setSubmitCount}
                            classNameCurrentPage="text-primary"
                            itemPerPage={itemPerPage}
                        />
                    </CardContent>
                </Card>
            </FadeIn>
        </Container>
    );
}

export default Tableau;
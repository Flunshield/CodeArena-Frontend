import Layout from "../../ComposantsCommun/Layout.tsx";
import Notification from "../../ComposantsCommun/Notification.tsx";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../AuthContext.tsx";
import {ADMIN_EVENT_FIND_EVENTS_ENTREPRISES} from "../../constantes/constantesRoutes.ts";
import {getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import DataTable from "../../ComposantsCommun/DataTable.tsx";
import {useTranslation} from "react-i18next";
import SearchBar from "../../ComposantsCommun/SearchBar.tsx";
import { Event } from "../../Interface/Interface.ts";
import Pagination from "../../ComposantsCommun/Pagination.tsx";
import {formatDate} from "../../Helpers/formatHelper.ts";

function AdminEventDashboard() {
    const authContext = useAuthContext();
    const {t} = useTranslation();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [submitCount, setSubmitCount] = useState(0);
    const [order, setOrder] = useState<string>('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [accepted, setAccepted] = useState<string>("all");
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [data, setData] = useState<{ items: Event[], total: number }>({items: [], total: 0});
    const getEventsEntreprises = getElementByEndpoint(ADMIN_EVENT_FIND_EVENTS_ENTREPRISES + `?order=${order}&currentPage=${currentPage}&itemPerPage=${itemPerPage}&accepted=${accepted}&searchTitle=${searchTitle}`, {
        token: authContext?.accessToken ?? "",
        data: ""
    });
    const headers = [
        {key: 'accepted', label: t('accepted')},
        {key: 'title', label: t('title')},
        {key: 'startDate', label: t('dateDebut')},
        {key: 'priceDetails', label: 'totalPrice'}];

    const eventsFormated = data.items.map((event: Event) => {
        return {
            accepted: event.accepted ? t('yes') : t('no'),
            title: event.title,
            startDate: formatDate(event.startDate, t),
            priceDetails: (parseFloat(String(event.priceDetails.finalPrice)).toFixed(2) + '€')
        };
    });

    const maxPage = Math.ceil(data.total / itemPerPage);

    useEffect(() => {
        getEventsEntreprises.then(async (response) => {
            if (response.status === 200) {
                const result = await response.json();
                setData(result);
            } else {
                setNotificationType('error');
                setNotificationMessage('Error while fetching data');
                setShowNotification(true);
            }
        });
    }, [order, currentPage, itemPerPage, accepted, searchTitle, submitCount]);

    return (
        <Layout>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <h1 className="text-lg text-center m-5 font-bold">Admin Event Dashboard</h1>
            <SearchBar
                setAccepted={setAccepted}
                setItemPerPage={setItemPerPage}
                placeholder={t('serachByTitre')}
                setCurrentPage={setCurrentPage}
                setOrder={setOrder}
                isAdmin={true}
                className={'m-5'}
                setSearchTitle={setSearchTitle}
            />
            <DataTable headers={headers} data={eventsFormated} className="rounded-xl m-5"
                       classNameHeader="bg-soft-gray"
                       classNameBody=""/>
            <Pagination
                item={data.items}
                maxPage={maxPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setSubmitCount={setSubmitCount}
                classNameCurrentPage="text-primary"
                itemPerPage={itemPerPage}
            />
        </Layout>
    );
}

export default AdminEventDashboard;
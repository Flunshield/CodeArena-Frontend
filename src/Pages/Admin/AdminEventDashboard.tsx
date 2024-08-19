import Layout from "../../ComposantsCommun/Layout.tsx";
import Notification from "../../ComposantsCommun/Notification.tsx";
import {useEffect, useState} from "react";
import {useAuthContext} from "../../AuthContext.tsx";
import {
    ADMIN_EVENT_FIND_EVENT_ENTREPRISE,
    ADMIN_EVENT_FIND_EVENTS_ENTREPRISES
} from "../../constantes/constantesRoutes.ts";
import {getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import DataTable from "../../ComposantsCommun/DataTable.tsx";
import {useTranslation} from "react-i18next";
import SearchBar from "../../ComposantsCommun/SearchBar.tsx";
import {Event} from "../../Interface/Interface.ts";
import Pagination from "../../ComposantsCommun/Pagination.tsx";
import {formatDate} from "../../Helpers/formatHelper.ts";

export interface eventsFormated {
    accepted: string;
    title: string;
    startDate: string;
    priceDetails: string;
    id: string;
}

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
    const [eventReceived, setEventReceived] = useState<Event>();
    const [openPopup, setOpenPopup] = useState(false);
    const [eventClicked, setEventClicked] = useState<eventsFormated>({accepted: "", title: "", startDate: "", priceDetails: "", id: ""});
    const [data, setData] = useState<{ items: Event[], total: number }>({items: [], total: 0});
    const getEventsEntreprises = getElementByEndpoint(ADMIN_EVENT_FIND_EVENTS_ENTREPRISES + `?order=${order}&currentPage=${currentPage}&itemPerPage=${itemPerPage}&accepted=${accepted}&searchTitle=${searchTitle}`, {
        token: authContext?.accessToken ?? "",
        data: ""
    });
    const getEvententreprise = getElementByEndpoint(ADMIN_EVENT_FIND_EVENT_ENTREPRISE + `?id=${eventClicked.id}`, {
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
            priceDetails: (parseFloat(String(event.priceDetails.finalPrice)).toFixed(2) + '€'),
            id: event.id?.toString() ?? ""
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

    // Cas aprticulier, j'ia besoinde faire un appel API à chaque fois que l'eventClicked change et uniquement dans ce cas.
    useEffect(() => {
        if(eventClicked.id !== "") {
            getEvententreprise.then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setEventReceived(result);
                    setOpenPopup(true);
                } else {
                    setNotificationType('error');
                    setNotificationMessage('Error while fetching data');
                    setShowNotification(true);
                }
            });
        }
    }, [eventClicked]);

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
                       classNameBody="" setEventClicked={setEventClicked}/>
            {data.items.length > 0 && (
                <Pagination
                    item={data.items}
                    maxPage={maxPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setSubmitCount={setSubmitCount}
                    classNameCurrentPage="text-primary"
                    itemPerPage={itemPerPage}
                />
            )}
            {openPopup && (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">{t('title')} : {eventReceived?.title}</h2>
                        <p className="text-gray-700 mb-2"><span
                            className="font-medium">{t('description')}</span> : {eventReceived?.description}</p>
                        <p className="text-gray-700 mb-2"><span
                            className="font-medium">{t('dateDebut')}</span> : {formatDate(eventReceived?.startDate, t)}
                        </p>
                        <p className="text-gray-700 mb-2"><span
                            className="font-medium">{t('dateFin')}</span> : {formatDate(eventReceived?.endDate, t)}</p>
                        <p className="text-gray-700 mb-2"><span
                            className="font-medium">{t('priceDetails')}</span> : {eventReceived?.priceDetails?.finalPrice}
                        </p>
                        <p className="text-gray-700 mb-4"><span
                            className="font-medium">{t('accepted')}</span> : {eventReceived?.accepted ? t('yes') : t('no')}
                        </p>
                        <p className="text-gray-700 mb-4"><span
                            className="font-medium">{t('accepted')}</span> : {eventReceived?.id}
                        </p>
                        <button
                            onClick={() => setOpenPopup(false)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            {t('close')}
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default AdminEventDashboard;
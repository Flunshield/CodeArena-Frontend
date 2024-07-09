import Layout from "../ComposantsCommun/Layout.tsx";
import {getElementByEndpoint} from "../Helpers/apiHelper.ts";
import {useAuthContext} from "../AuthContext.tsx";
import {useEffect, useState} from "react";
import TableauEvent from "../Composants/dashboard/TableauEvent.tsx";
import {Event} from "../Interface/Interface.ts";

function EventDashboard() {
    const authContext = useAuthContext();
    const data = {token: authContext.accessToken ?? ""}
    const [infosEvent, setInfosEvent] = useState<Event[]>([])
    const getAllEvents = getElementByEndpoint('evenement/findEvents', {token: data.token, data: ""});

    useEffect(() => {
        if (infosEvent.length === 0) {
            getAllEvents.then(async (response) => {
                const result = await response.json();
                setInfosEvent(result);
            });
        }
    }, []);

    return (
        <Layout>
            <div className="m-5 rounded-xl border-tertiari bg-secondary p-5 h-full xl:w-full xl:mr-8">
                <TableauEvent infosEvents={infosEvent} isImg={false} className="m-5 rounded-xl border-tertiari bg-secondary p-5 h-full"/>
            </div>
        </Layout>
    );
}

export default EventDashboard;
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
    const getAllEvents = getElementByEndpoint('evenement/findEvents', data);

    useEffect(() => {
        if (infosEvent.length === 0) {
            getAllEvents.then(async (response) => {
                const result = await response.json();
                setInfosEvent(result);
            });
        }
    }, []);
console.log(infosEvent)
    return (
        <Layout>
            <div className="m-32 mb-64">
                <TableauEvent infosEvents={infosEvent} isImg={false}/>
            </div>
        </Layout>
    );
}

export default EventDashboard;
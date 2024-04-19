import HomeDev from "../Composants/home/homeDev.tsx";
import Switcher from "../ComposantsCommun/Switcher.tsx";
import {useState} from "react";
import HomeEntreprise from "../Composants/home/homeEntreprise.tsx";
import {useAuthContext} from "../AuthContext.tsx";
import Layout from "../ComposantsCommun/Layout.tsx";


function Home() {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const [currentHome, setCurrentHome] = useState<boolean>(false);

    return (
        <div>
            {!isConnected &&
                <Switcher setCurrentHome={setCurrentHome} currentHome={currentHome}
                          className="mt-16 absolute w-full z-50"/>
            }
            <Layout>
                {currentHome ? <HomeEntreprise/> : <HomeDev/>}
            </Layout>
        </div>
    );
}

export default Home;

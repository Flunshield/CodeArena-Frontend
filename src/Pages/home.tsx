import HomeDev from "../Composants/home/homeDev.tsx";
import Switcher from "../ComposantsCommun/Switcher.tsx";
import {useState} from "react";
import HomeEntreprise from "../Composants/home/homeEntreprise.tsx";
import {useAuthContext} from "../AuthContext.tsx";


function Home() {
    const authContext = useAuthContext();
    const isConnected = authContext.connected;
    const [currentHome, setCurrentHome] = useState<boolean>(false);

    return (
        <div>
            {!isConnected &&
            <Switcher setCurrentHome={setCurrentHome} currentHome={currentHome}/>
            }
            {currentHome ? <HomeEntreprise/> : <HomeDev/>}


        </div>
    );
}

export default Home;

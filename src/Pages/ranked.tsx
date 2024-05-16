import Button from '../ComposantsCommun/Button';
import useLoader from '../ComposantsCommun/LoaderMatch.tsx';
import Layout from "../ComposantsCommun/Layout.tsx";
import { useAuthContext } from "../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { DataToken } from "../Interface/Interface.ts";
import { postElementByEndpoint, getElementByEndpoint } from "../Helpers/apiHelper.ts";



function Ranked() {
    
    const authContext = useAuthContext();
    
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken
    
    const FindMatch = async () => {
        const id = infos.data.id ?? '';
        console.log('id: ', id);
        
        const response = await postElementByEndpoint(`matchmaking/joinQueue`, {
            token: authContext.accessToken ?? '',
            data: {id}
        })
    
        if (response.status === 201) {
            console.log("ajouter à la file d'attente et recherhce de match en cours");
            const response = await getElementByEndpoint('matchmaking/queue', {
                token: authContext.accessToken ?? "",
                data: ''
            })
            if (response.status === 201) {
                console.log("Match trouvé");
                alert("Match trouvé");
            }
        } else {
            alert("Erreur lors de la recherche de match");
        }
    }

    return (
        <Layout>
            <div className="m-2 text-white flex justify-center">
                <Button id="ranked-button" type={'button'} className="bg-green-500 m-2 p-2 rounded-md" onClick={FindMatch}>Trouver un match</Button>
            </div>
            {useLoader()}
        </Layout>
    );
}

export default Ranked;
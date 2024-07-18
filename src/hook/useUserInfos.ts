import {useEffect, useState} from "react";
import {DataToken, User} from "../Interface/Interface.ts";
import {getElementByEndpoint} from "../Helpers/apiHelper.ts";
import {PRICING} from "../constantes/constanteEntreprise.ts";
import {useAuthContext} from "../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";

const useUserInfos = () => {

    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser.aud as unknown as DataToken;
    const [infosUserById, setInfosUserById] = useState<User>({} as User);

    const getUserById = getElementByEndpoint("user/getUser?id=" + infos.data.id, {
        token: authContext.accessToken ?? "",
        data: "",
    });

    useEffect(() => {
        getUserById.then(async (response) => {
            if (response.status === 200) {
                const result = await response.json();
                result.commandeEntrepriseFormatted = {
                    commande: result?.commandeEntreprise[0],
                    pricing: PRICING.find((pricing) => pricing.idApi === result?.commandeEntreprise[0]?.item),
                };
                setInfosUserById(result);
            }
        });
    }, []);

    return {...infosUserById};

}

export default useUserInfos;
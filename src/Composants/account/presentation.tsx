import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {DataToken} from "../../Interface/Interface.ts";
import {updateUser} from "../../Helpers/apiHelper.ts";
import Label from "../../ComposantsCommun/Label.tsx";

function Presentation() {
    const {t} = useTranslation();
    const authContext = useAuthContext();


    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as DataToken

    const updatePresentation = async () => {
        const presentationTextarea = document.getElementById("presentation") as HTMLTextAreaElement | null;
        const presentationValue = presentationTextarea?.value;
        const response = await updateUser("user/updateUser", {
            id: infos.data.id,
            userName: infos.data.userName,
            token: authContext.accessToken,
            presentation: presentationValue
        });

        if (response.ok) {
            alert("Présentation mise à jour");
        } else {
            alert("Erreur lors de la mise à jour de la présentation");
        }
    };
    return (
        <div className="flex flex-col ml-20 mr-20 lg:ml-36 ">
            <Label id={"labelTextArea"} className="text-white text-3xl font-bold">{t("presentation")}</Label>
            <textarea id="presentation" name="presentation" rows={8} cols={75}
                      className="rounded-xl bg-secondary text-white border-white border-2 p-5 mt-5"
                      defaultValue={infos.data.presentation || 'Aucune description'}/>
            <button onClick={updatePresentation} className="text-white text-right mt-2"></button>
        </div>
    )
}

export default Presentation;
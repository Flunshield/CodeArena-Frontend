import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import {User} from "../../Interface/Interface.ts";
import {updateUser} from "../../Helpers/apiHelper.ts";
import Label from "../../ComposantsCommun/Label.tsx";

interface PresentationProps {
    infosUserById: User;
}

function Presentation({infosUserById}: PresentationProps) {
    const {t} = useTranslation();
    const authContext = useAuthContext();

    const updatePresentation = async () => {
        const presentationTextarea = document.getElementById("presentation") as HTMLTextAreaElement | null;
        const presentationValue = presentationTextarea?.value;
        const response = await updateUser("user/updateUser", {
            id: infosUserById.id,
            userName: infosUserById.userName,
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
        <div className="flex flex-col m-5">
            <Label id={"labelTextArea"} className="text-tertiari text-3xl font-bold">{t("presentation")}</Label>
            <textarea id="presentation" name="presentation" rows={8} cols={75}
                      className="rounded-xl bg-secondary text-tertiari border-tertiari border-2 p-5 mt-5"
                      placeholder="Aucune description ..."
                      defaultValue={infosUserById.presentation}/>
            <button onClick={updatePresentation} className="text-tertiari text-right mt-2">{t("update")}</button>
        </div>
    )
}

export default Presentation;
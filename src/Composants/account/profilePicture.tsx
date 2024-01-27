import {imagePaths} from "../../constantes.ts";
import {useState} from "react";
import {updateUser} from "../../Helpers/apiHelper.ts";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import {JwtPayload} from "jwt-decode";
import {User} from "../../Interface/Interface.ts";
import clsx from "clsx";

interface ProfilePictureProps {
    classname?: string;
}
function ProfilePicture(value: ProfilePictureProps) {
    const {t} = useTranslation();
    const authContext = useAuthContext();


    // Obliger de faire ces étapes pour récupérer les infos de l'utilisateur
    const infosUser = authContext?.infosUser as JwtPayload
    const infos = infosUser.aud as unknown as User
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPictureClicked, setIsPictureClicked] = useState("");

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = async () => {
        const response = await updateUser("user/updateUser", {
            id: infos.id,
            userName: infos.userName,
            token: authContext.accessToken,
            avatar: `src/assets/photosProfiles/${isPictureClicked}`
        });
        if (response.ok) {
            setPopupOpen(false);
        } else {
            alert("Erreur lors de la mise à jour de l'avatar");
        }
    };

    const addPicture = (id: string) => {
        const picture = document.getElementById(id);
        setIsPictureClicked(id ?? "");

        // Filtrer les éléments qui ne répondent pas à la condition (différents de l'id)
        const picturesNotSelected = imagePaths.filter((path) => path !== id);

        picturesNotSelected.forEach((notSelectedId) => {
            const pictureToDelete = document.getElementById(notSelectedId);

            // Supprimer les classes des images non sélectionnées
            pictureToDelete?.classList.remove("border-4");
            pictureToDelete?.classList.remove("border-white");
        });

        // Ajouter les classes à l'image sélectionnée
        picture?.classList.add("border-4");
        picture?.classList.add("border-white");
    };

    return (
        <div className={clsx(value.classname, "relative")}>
            <img className="rounded-full w-48 h-48 border-2 border-white"
                 src={isPictureClicked !== "" ? `src/assets/photosProfiles/${isPictureClicked ? isPictureClicked : "noImage.png"}` : infos.avatar}
                 alt="Avatar"
                 onClick={openPopup}/>
            {isPopupOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-secondary p-8 rounded-md flex flex-col">
                        <div className="flex flex-wrap w-96">
                            {imagePaths.map((path) => (
                                <img className="rounded-full w-20 h-20 m-5" key={path} id={path}
                                     onClick={() => addPicture(path)}
                                     src={`src/assets/photosProfiles/${path}`} alt={`Image ${path}`}/>
                            ))}
                        </div>
                        <button onClick={closePopup} className="text-white mr-6">{t("update")}</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePicture;
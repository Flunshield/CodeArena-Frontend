import {imagePaths} from "../../constantes/constantesRoutes.ts";
import {useState} from "react";
import {updateUser} from "../../Helpers/apiHelper.ts";
import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import {User} from "../../Interface/Interface.ts";
import clsx from "clsx";
import Button from "../../ComposantsCommun/Button.tsx";
import btnClose from "/assets/btnClose.png";

interface ProfilePictureProps {
    classname?: string;
    infosUserById?: User;
}

function ProfilePicture({classname, infosUserById}: ProfilePictureProps) {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPictureClicked, setIsPictureClicked] = useState("");

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = async () => {
        if (isPictureClicked !== "") {
            const response = await updateUser("user/updateUser", {
                id: infosUserById?.id,
                userName: infosUserById?.userName,
                token: authContext.accessToken,
                avatar: `/assets/photosProfiles/${isPictureClicked}`
            });
            if (response.ok) {
                setPopupOpen(false);
                window.location.reload();
            } else {
                alert("Erreur lors de la mise à jour de l'avatar");
            }
        } else {
            setPopupOpen(false);
        }
    };

    const addPicture = (id: string | undefined) => {
        const picture = document.getElementById(id ?? "noImage.png");
        setIsPictureClicked(id ?? "noImage.png");

        // Filtrer les éléments qui ne répondent pas à la condition (différents de l'id)
        const picturesNotSelected = imagePaths.filter((path) => path !== id);

        picturesNotSelected.forEach((notSelectedId) => {
            const pictureToDelete = document.getElementById(notSelectedId);

            // Supprimer les classes des images non sélectionnées
            pictureToDelete?.classList.remove("border-4");
            pictureToDelete?.classList.remove("border-tertiari");
        });

        // Ajouter les classes à l'image sélectionnée
        picture?.classList.add("border-4");
        picture?.classList.add("border-tertiari");
    };

    return (
        <div className={clsx(classname)}>
            <img className="rounded-full w-48 h-48 border-2 border-tertiari"
                 src={isPictureClicked !== "" ? `/assets/photosProfiles/${isPictureClicked ? isPictureClicked : "iconsLogin.svg"}` : infosUserById?.avatar}
                 alt="Avatar"
                 onClick={openPopup}/>
            {isPopupOpen && (
                <div
                    className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90">
                    <div className="flex flex-row-reverse bg-secondary rounded-md pb-4">
                        <Button
                            type="button"
                            id="navBarButtonClose"
                            onClick={closePopup}
                            className="absolute ml-5"
                        >
                            <img src={btnClose} alt="icone bouton clsoe" className="w-8 h-8 mr-3"/>
                        </Button>
                        <div className="flex flex-col">
                            <div className="flex flex-wrap w-96">
                                {imagePaths.map((path) => (
                                    <img className="rounded-full w-20 h-20 m-5" key={path} id={path}
                                         onClick={() => addPicture(path)}
                                         src={`/assets/photosProfiles/${path}`} alt={`Image ${path}`}/>
                                ))}
                            </div>
                            <button onClick={closePopup} className="text-tertiari mr-6">{t("update")}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePicture;
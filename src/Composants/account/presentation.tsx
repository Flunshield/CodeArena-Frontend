import {useTranslation} from "react-i18next";
import {useAuthContext} from "../../AuthContext.tsx";
import {User} from "../../Interface/Interface.ts";
import {updateUser} from "../../Helpers/apiHelper.ts";
import Label from "../../ComposantsCommun/Label.tsx";
import { Container } from "../../ComposantsCommun/Container";
import { FadeIn } from "../../ComposantsCommun/FadeIn";
import {useState} from "react";
import Notification from "../../ComposantsCommun/Notification.tsx";

interface PresentationProps {
    infosUserById: User;
}

function Presentation({infosUserById}: PresentationProps) {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

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
            setNotificationMessage(t('presentationUpdated'));
            setNotificationType('success');
            setShowNotification(true);
        } else {
            setNotificationMessage(t('errorPresentationUpdated'));
            setNotificationType('error');
            setShowNotification(true);
        }
    };

    return (
        <Container>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
            <FadeIn>
                <div className="flex flex-col items-start w-full">
                    <Label id="labelTextArea" className="text-neutral-900 text-3xl font-bold mb-4">{t("presentation")}</Label>
                    <textarea
                        id="presentation"
                        name="presentation"
                        rows={8}
                        cols={75}
                        className="rounded-xl bg-neutral-100 text-neutral-900 border-neutral-300 border-2 p-5 mb-5 w-full max-w-2xl"
                        placeholder="Aucune description ..."
                        defaultValue={infosUserById.presentation}
                    />
                    <button
                        onClick={updatePresentation}
                        className="bg-primary text-secondary py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-primary-dark"
                    >
                        {t("update")}
                    </button>
                </div>
            </FadeIn>
        </Container>
    );
}

export default Presentation;

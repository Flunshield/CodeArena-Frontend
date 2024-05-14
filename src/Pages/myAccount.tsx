import Layout from "../ComposantsCommun/Layout.tsx";
import ProfilePicture from "../Composants/account/profilePicture.tsx";
import Presentation from "../Composants/account/presentation.tsx";
import {useState} from "react";
import MyForm from "../Composants/account/MyForm.tsx";
import InfosUser from "../Composants/account/infosUser.tsx";
import Badges from "../Composants/account/bagdes.tsx";

function MyAccount() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = async () => {
        setPopupOpen(false);
    };


    return (
        <Layout>
            <div className="flex flex-col text-center">
                <div className="flex flex-col ">
                    <ProfilePicture classname="mr-auto ml-auto"/>
                    <InfosUser openPopup={openPopup}/>
                </div>
                <div className="flex flex-col text-left">
                    <Presentation/>
                    <Badges/>
                </div>
            </div>
            {isPopupOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90">
                    <div className="bg-secondary p-8 rounded-md flex flex-col">
                        <MyForm onClose={closePopup}/>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default MyAccount;

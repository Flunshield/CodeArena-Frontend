import Layout from "../ComposantsCommun/Layout.tsx";
import ProfilePicture from "../Composants/account/profilePicture.tsx";
import Presentation from "../Composants/account/presentation.tsx";

function MyAccount() {

    return (
        <Layout>
            <div className="flex flex-row justify-between top-0">
                <div className="relative mt-60 mb-60 ml-60 flex flex-wrap">
                    <ProfilePicture/>
                    <Presentation/>
                </div>
            </div>
        </Layout>
    );
}

export default MyAccount;

import Layout from "../ComposantsCommun/Layout.tsx";
import {useAuthContext} from "../AuthContext.tsx";

function Home() {
    // exemple de comment déclaré le context Auth
    const authContext = useAuthContext();

    return (
        <Layout>
            {authContext?.connected &&
            <p>coucou</p>
            }
        </Layout>
    )
}

export default Home

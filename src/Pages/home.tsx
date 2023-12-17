import Layout from "../ComposantsCommun/Layout.tsx";
import useAuth from "../hook/useTokenRefresher.tsx";
import {useAuthContext} from "../AuthContext.tsx";

function Home() {
    const authState = useAuth({});
    const authContext = useAuthContext();
console.log(authContext)
    return (
        <Layout>
            {authState?.connected &&
            <p>coucou</p>
            }
        </Layout>
    )
}

export default Home

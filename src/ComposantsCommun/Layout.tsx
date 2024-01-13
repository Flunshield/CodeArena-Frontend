import {ReactNode} from 'react';
import Footer from '../ComposantsCommun/Footer';
import Header from "./Header.tsx";


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    //const authContext = useAuthContext();

    return (
        <div className="flex flex-col min-h-screen m-0 w-100">
            <Header/>
            <main className="flex-grow">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout
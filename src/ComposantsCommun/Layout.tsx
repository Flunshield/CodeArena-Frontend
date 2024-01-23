import {ReactNode} from 'react';
import Footer from '../ComposantsCommun/Footer';
import Header from "./Header.tsx";


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
            <div className="flex flex-col min-h-screen w-full">
                <Header/>
                <div id="mainFooter" className="z-10">
                    <main className="flex-grow" id="main">
                        {children}
                    </main>
                    <Footer/>
                </div>
            </div>
    )
}

export default Layout
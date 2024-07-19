import {ReactNode} from 'react';
import Footer from '../ComposantsCommun/Footer';
import Header from "./Header.tsx";
import CookieConsentBanner from "./CookieConsentBanner.tsx";
import clsx from "clsx";


type LayoutProps = {
    children: ReactNode
    classnameMain?: string
    classnameFooter?: string
}

const Layout = ({children, classnameMain, classnameFooter}: LayoutProps) => {
    return (
        <div className="flex flex-col bg-tertiari/50 min-h-screen w-auto">
            <Header/>
            <div id="mainFooter" className="">
                <main className={clsx(classnameMain, "flex-grow min-h-screen")} id="main">
                    {children}
                </main>
                <CookieConsentBanner />
                <Footer className={classnameFooter}/>
            </div>
        </div>
    )
}

export default Layout
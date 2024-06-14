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
        <div className="flex flex-col min-h-screen w-auto">
            <Header/>
            <div id="mainFooter" className="">
                <main className={clsx(classnameMain, "flex-grow min-h-screen mt-32 mb-32")} id="main">
                    {children}
                </main>
                <CookieConsentBanner />
                <Footer className={classnameFooter}/>
            </div>
        </div>
    )
}

export default Layout
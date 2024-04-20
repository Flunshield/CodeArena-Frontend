import Layout from "./Layout.tsx";
import {useTranslation} from "react-i18next";

const CookiePolicyPage = () => {
    const {t} = useTranslation();

    return (
        <Layout>
            <div className="container mx-auto p-6 text-tertiari mt-32 mb-32">
                <h1 className="text-2xl font-bold mb-4">{t('cookieTitle1')}</h1>
                <p className="mb-4">
                    {t('cookie1')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('cookieTitle2')}</h2>
                <p className="mb-4">
                    {t('cookie2')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('cookieTitle3')}</h2>
                <p className="mb-4">
                    {t('cookie3')}
                </p>
                <p className="mb-4">
                    {t('cookie4')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('cookieTitle4')}</h2>
                <p className="mb-4">
                    {t('cookie5')}
                </p>
                <p className="mb-4">
                    {t('cookie6')}
                </p>
                <p className="mb-4">
                    {t('cookie7')}
                </p>
            </div>
        </Layout>
    );
};

export default CookiePolicyPage;

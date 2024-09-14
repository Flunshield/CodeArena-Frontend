import Layout from "./Layout.tsx";
import {useTranslation} from "react-i18next";
import { Container } from "./Container.tsx";
import { SectionIntro } from "./SectionIntro.tsx";

const CookiePolicyPage = () => {
    const {t} = useTranslation();

    return (
        <Layout>
            <Container className="mt-10 mb-3 py-5 bg-tertiari rounded-xl shadow-lg">
                <SectionIntro title={t("conditionsGeneralesVente")}>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div className="container mx-auto p-6 text-secondary ">
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
                    </div>
                </SectionIntro>
            </Container>
        </Layout>
);
};

export default CookiePolicyPage;

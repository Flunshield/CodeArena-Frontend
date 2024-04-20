import Layout from "./Layout.tsx";
import {useTranslation} from "react-i18next";

const LegalMentions = () => {
    const {t} = useTranslation();
    return (
        <Layout>
            <div className="container mx-auto p-6 text-tertiari mt-32 mb-32">
                <h1 className="text-2xl font-bold mb-4">{t('mentionLegal')}</h1>
                <p className="mb-4">
                    {t('mentionLegal1')}
                </p>
                <p className="mb-4">
                    {t('mentionLegal2')}
                </p>
                <p className="mb-4">
                    {t('mentionLegal3')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('hebergeur')}</h2>
                <p className="mb-4">
                    {t('mentionLegal4')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('proprieteIntellect')}</h2>
                <p className="mb-4">
                    {t('mentionLegal5')}
                </p>
                <p className="mb-4">
                    {t('mentionLegal6')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('responsabilite')}</h2>
                <p className="mb-4">
                    {t('mentionLegal7')}
                </p>
                <p className="mb-4">
                    {t('mentionLegal8')}
                </p>
            </div>
        </Layout>
    );
};

export default LegalMentions;

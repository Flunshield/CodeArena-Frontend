import Layout from './Layout';
import {useTranslation} from "react-i18next";

const PrivacyPolicy = () => {
    const {t} = useTranslation();
    return (
        <Layout>
            <div className="container mx-auto p-6 text-tertiari">
                <h1 className="text-2xl font-bold mb-4">{t('privacyTitle')}</h1>
                <p className="mb-4">
                    {t('privacy1')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('collecteUseInformation')}</h2>
                <p className="mb-4">
                    {t('privacy2')}
                </p>
                <p className="mb-4">
                    {t('privacy3')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('protectData')}</h2>
                <p className="mb-4">
                    {t('privacy4')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('cookies')}</h2>
                <p className="mb-4">
                    {t('privacy5')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('partageInformation')}</h2>
                <p className="mb-4">
                    {t('privacy6')}
                </p>
                <h2 className="text-xl font-bold mb-2">{t('majPolitiqueConfidentialite')}</h2>
                <p className="mb-4">
                    {t('privacy7')}
                </p>
                <p className="mb-4">
                    {t('privacy8')}
                </p>
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;

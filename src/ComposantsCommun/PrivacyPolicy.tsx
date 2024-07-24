import { Container } from './Container';
import Layout from './Layout';
import { useTranslation } from "react-i18next";
import { SectionIntro } from './SectionIntro';

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <Container className="mt-10 mb-3 py-5 bg-tertiari rounded-xl shadow-lg">
                <SectionIntro title={t('privacyTitle')} >
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div className="container mx-auto p-6 text-secondary">
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
                    </div>
                </SectionIntro>
            </Container>
        </Layout>
    );
};

export default PrivacyPolicy;

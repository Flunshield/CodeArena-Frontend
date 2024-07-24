import { Container } from "./Container.tsx";
import Layout from "./Layout.tsx";
import { useTranslation } from "react-i18next";
import { SectionIntro } from "./SectionIntro.tsx";

const LegalMentions = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <Container className="mt-10 mb-3 py-5 bg-tertiari rounded-xl shadow-lg">
                <SectionIntro  title={t('mentionLegal')} >
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div className="container mx-auto p-6 text-secondary ">
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
                    </div>
                </SectionIntro>

            </Container>
        </Layout>
    );
};

export default LegalMentions;

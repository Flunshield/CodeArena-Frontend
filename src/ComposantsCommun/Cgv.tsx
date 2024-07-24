import { Container } from "./Container.tsx";
import Layout from "./Layout.tsx";
import { useTranslation } from "react-i18next";
import { SectionIntro } from "./SectionIntro.tsx";

const TermsAndConditions = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <Container className="mt-10 mb-3 py-5 bg-tertiari rounded-xl shadow-lg">
                <SectionIntro title={t("conditionsGeneralesVente")} >
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div className="container mx-auto p-6 text-secondary ">
                            <h2 className="text-xl font-bold mb-2">{t("article1Objet")}</h2>
                            <p className="mb-4">{t("article1Content")}</p>
                            <h2 className="text-xl font-bold mb-2">{t("article2Prix")}</h2>
                            <p className="mb-4">{t("article2Content")}</p>
                            <h2 className="text-xl font-bold mb-2">{t("article3Commandes")}</h2>
                            <p className="mb-4">{t("article3Content")}</p>
                            <h2 className="text-xl font-bold mb-2">{t("article4Livraison")}</h2>
                            <p className="mb-4">{t("article4Content")}</p>
                            <h2 className="text-xl font-bold mb-2">{t("article5Paiement")}</h2>
                            <p className="mb-4">{t("article5Content")}</p>
                            <h2 className="text-xl font-bold mb-2">{t("article6DroitRetractation")}</h2>
                            <p className="mb-4">{t("article6Content")}</p>
                            <h2 className="text-xl font-bold mb-2">{t("article7ServiceClient")}</h2>
                            <p className="mb-4">{t("article7Content")}</p>
                        </div>
                    </div>
                </SectionIntro>
            </Container>
        </Layout>
    );
};

export default TermsAndConditions;

import Layout from "./Layout.tsx";
import {useTranslation} from "react-i18next";

const TermsAndConditions = () => {
    const {t} = useTranslation();
    return (
        <Layout>
            <div className="container mx-auto p-6 text-tertiari mt-32 mb-32">
                <h1 className="text-2xl font-bold mb-4">{t("conditionsGeneralesVente")}</h1>
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
        </Layout>
    );
};

export default TermsAndConditions;

import Layout from "../../ComposantsCommun/Layout.tsx";
import CardExplainSection from "../../Composants/home/homeEntreprise/cardExplainSection.tsx";
import PricingSection from "../../Composants/home/homeEntreprise/PricingSection.tsx";
import TrustSection from "../../Composants/home/homeEntreprise/trustSection.tsx";

const Entreprise = () => {
    return (
        <Layout>
            <div className="flex flex-row justify-between top-0 mr-60">
                <div className="container mx-auto py-8 pt-32 z-20  ml-32 mr-32">
                    <CardExplainSection/>
                    <PricingSection/>
                    <TrustSection/>
                </div>
            </div>
        </Layout>
    )
}

export default Entreprise;
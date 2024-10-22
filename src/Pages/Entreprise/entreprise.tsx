import Layout from "../../ComposantsCommun/Layout.tsx";
import CardExplainSection from "../../Composants/home/homeEntreprise/cardExplainSection.tsx";
import PricingSection from "../../Composants/home/homeEntreprise/PricingSection.tsx";
import TrustSection from "../../Composants/home/homeEntreprise/trustSection.tsx";

function Entreprise () {
    return (
        <Layout>
            <div className="md:flex md:flex-row md:justify-between mt-16 mb-24 w-full">
                <div className="pt-16 z-20 flex flex-col justify-center w-full">
                    <CardExplainSection/>
                    <PricingSection/>
                    <TrustSection/>
                </div>
            </div>
        </Layout>
    )
}

export default Entreprise;
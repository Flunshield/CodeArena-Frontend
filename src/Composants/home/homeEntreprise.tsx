import Layout from "../../ComposantsCommun/Layout.tsx";
import PricingSection from "./homeEntreprise/PricingSection.tsx";
import CardExplainSection from "./homeEntreprise/cardExplainSection.tsx";
import TrustSection from "./homeEntreprise/trustSection.tsx";

const HomeEntreprise = () => {
    return (
        <Layout>
            <div className="flex flex-row justify-between top-0 mr-60">
                <div className="mx-auto py-8 pt-32 z-20  ml-32 mr-32">
                    <CardExplainSection/>
                    <PricingSection/>
                    <TrustSection/>
                </div>
                <img
                    className="bg-primary hidden xl:block absolute right-0 -z-10"
                    src="/assets/tree.svg"
                    alt="arbre design"
                    id="arbre"
                />
            </div>
        </Layout>
    )
}

export default HomeEntreprise;
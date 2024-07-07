
import PricingSection from "./homeEntreprise/PricingSection.tsx";
import CardExplainSection from "./homeEntreprise/cardExplainSection.tsx";
import TrustSection from "./homeEntreprise/trustSection.tsx";

const HomeEntreprise = () => {
    return (
        <div className="md:flex md:flex-row md:justify-center mt-32 mb-24">
            <div className="pt-22 z-10 flex flex-col justify-center">
                <CardExplainSection/>
                <PricingSection/>
                <TrustSection/>
            </div>
        </div>
    )
}

export default HomeEntreprise;
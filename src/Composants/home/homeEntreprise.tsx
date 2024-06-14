
import PricingSection from "./homeEntreprise/PricingSection.tsx";
import CardExplainSection from "./homeEntreprise/cardExplainSection.tsx";
import TrustSection from "./homeEntreprise/trustSection.tsx";

const HomeEntreprise = () => {
    return (
        <div className="md:flex md:flex-row md:justify-between mt-16 mb-24 w-full">
            <div className="pt-32 z-20 flex flex-col justify-center">
                <CardExplainSection/>
                <PricingSection/>
                <TrustSection/>
            </div>
        </div>
    )
}

export default HomeEntreprise;
import PricingSection from "./homeEntreprise/PricingSection.tsx";
import CardExplainSection from "./homeEntreprise/cardExplainSection.tsx";
import TrustSection from "./homeEntreprise/trustSection.tsx";

const HomeEntreprise = () => {
    return (
        <div className="flex flex-col items-center mt-32 mb-24">
            <div className="pt-22 z-10 w-full max-w-6xl">
                <CardExplainSection/>
                <PricingSection/>
                <TrustSection/>
            </div>
        </div>
    );
};

export default HomeEntreprise;

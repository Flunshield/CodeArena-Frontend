import PricingSection from "./homeEntreprise/PricingSection.tsx";
import CardExplainSection from "./homeEntreprise/cardExplainSection.tsx";
import TrustSection from "./homeEntreprise/trustSection.tsx";

const HomeEntreprise = () => {
    return (
        <div className="flex flex-col md:flex-row md:justify-center mt-16 mb-24 w-full">
            <div className="pt-32 flex flex-col items-center md:items-center w-full">
                <CardExplainSection />
                <PricingSection />
                <TrustSection />
            </div>
        </div>
    );
};

export default HomeEntreprise;

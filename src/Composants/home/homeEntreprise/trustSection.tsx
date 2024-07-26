import { ENTREPRISE_TRUST } from "../../../constantes/constanteEntreprise.ts";
import { useTranslation } from "react-i18next";
import { Container } from "../../../ComposantsCommun/Container";
import { FadeIn, FadeInStagger } from "../../../ComposantsCommun/FadeIn";

const TrustSection = () => {
    const { t } = useTranslation();

    return (
        <div id="TrustSection" className="w-full rounded-2xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56 lg:ml-96 ">
            <Container>
                <FadeIn className="flex items-center gap-x-40">
                    <h2 className="text-center font-display text-3xl font-semibold tracking-wider text-tertiari sm:text-left">
                        {t("trustSection")}
                    </h2>
                    <div className="h-px flex-auto bg-neutral-800 w-full" />
                </FadeIn>
                <FadeInStagger faster>
                    <ul role="list" className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {ENTREPRISE_TRUST.map((client, index) => (
                            <li key={index}>
                                <FadeIn>
                                    <div className="flex flex-col items-center">
                                       
                                        <img src={client.src} alt={client.alt} className="mx-16 w-16" />
                                        <h2 className="text-center text-xl text-tertiari mb-2">{client.name}</h2>
                                    </div>
                                </FadeIn>
                            </li>
                        ))}
                    </ul>
                </FadeInStagger>
            </Container>
        </div>
    );
};

export default TrustSection;

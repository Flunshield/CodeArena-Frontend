import { ENTREPRISE_TRUST } from "../../../constantes/constanteEntreprise.ts";
import { useTranslation } from "react-i18next";
import { Container } from "../../../ComposantsCommun/Container";
import { FadeIn, FadeInStagger } from "../../../ComposantsCommun/FadeIn";

const TrustSection = () => {
    const { t } = useTranslation();

    return (
        <div
            id="TrustSection"
            className="w-full rounded-2xl bg-neutral-950 py-12 sm:py-20 lg:py-32 mt-16 sm:mt-32 lg:mt-56"
        >
            <Container>
                <FadeIn className="flex flex-col sm:flex-row items-center sm:items-start gap-y-6 sm:gap-y-0 sm:gap-x-8">
                    <h2 className="text-center sm:text-left font-display text-2xl sm:text-3xl font-semibold tracking-wider text-tertiari">
                        {t("trustSection")}
                    </h2>
                    <div className="flex-auto sm:w-auto w-full h-px bg-neutral-800" />
                </FadeIn>
                <FadeInStagger faster>
                    <ul
                        role="list"
                        className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8"
                    >
                        {ENTREPRISE_TRUST.map((client, index) => (
                            <li key={index}>
                                <FadeIn>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={client.src}
                                            alt={client.alt}
                                            className="w-20 h-20 object-contain mb-2"
                                        />
                                        <h3 className="text-center text-lg sm:text-xl text-tertiari">
                                            {client.name}
                                        </h3>
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

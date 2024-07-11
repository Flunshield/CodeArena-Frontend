import { Container } from "../../../ComposantsCommun/Container.tsx";
import { FadeIn, FadeInStagger } from "../../../ComposantsCommun/FadeIn.tsx";
import { SectionIntro } from "../../../ComposantsCommun/SectionIntro.tsx";
import { CARD_EXPLANATION } from "../../../constantes/constanteEntreprise.ts";
import { useTranslation } from "react-i18next";

const CardExplainSection = () => {
    const { t } = useTranslation();

    return (
        <div id="CardExplainSection" className="w-full flex  items-center">
            <SectionIntro
                title={t("avantageCodeArena")}
                className="mt-24 sm:mt-32 lg:mt-40 text-secondary"
            />
            <Container className="mt-16">
                <FadeInStagger>
                    <FadeIn duration={1.0}>
                        <ul className="flex flex-col m-10 xl:grid grid-cols-1 md:grid-cols-2 gap-6">
                            {CARD_EXPLANATION.map((card, index) => (
                                <li key={index} className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                                    <h3 className="text-xl text-center font-semibold mb-4">{t(card.title)}</h3>
                                    <p className="text-gray-700">
                                        {t(card.description)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </FadeIn>
                </FadeInStagger>
            </Container>
        </div>
    );
};

export default CardExplainSection;

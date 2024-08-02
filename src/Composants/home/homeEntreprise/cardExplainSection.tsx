import { Container } from "../../../ComposantsCommun/Container.tsx";
import { FadeIn, FadeInStagger } from "../../../ComposantsCommun/FadeIn.tsx";
import { SectionIntro } from "../../../ComposantsCommun/SectionIntro.tsx";
import { CARD_EXPLANATION } from "../../../constantes/constanteEntreprise.ts";
import { useTranslation } from "react-i18next";

const CardExplainSection = () => {
    const { t } = useTranslation();

    return (
        <div
            id="CardExplainSection"
            className="flex flex-col items-center justify-center w-full mt-16 sm:mt-24 lg:mt-32"
        >
            <SectionIntro
                title={t("avantageCodeArena")}
                className="text-secondary text-center px-4 sm:px-8"
            />
            <Container className="mt-12 sm:mt-16">
                <FadeInStagger>
                    <FadeIn duration={1.0}>
                        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
                            {CARD_EXPLANATION.map((card, index) => (
                                <li
                                    key={index}
                                    className="flex flex-col w-full rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8"
                                >
                                    <h3 className="text-xl text-center font-semibold mb-4">
                                        {t(card.title)}
                                    </h3>
                                    <p className="text-gray-700">{t(card.description)}</p>
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

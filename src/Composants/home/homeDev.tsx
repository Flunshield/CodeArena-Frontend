import { Container } from "../../ComposantsCommun/Container";
import { FadeIn } from "../../ComposantsCommun/FadeIn";
import Clients from "./homeDev/Client";
import CaseStudiess from "./homeDev/CaseStudiess";
import Services from "./homeDev/Services";
import { useTranslation } from "react-i18next";
// import { Testimonial } from "./homeDev/Testimonial";


const HomeDev = () => {
    const { t } = useTranslation();
    return (
        <>
            <Container className="mt-80 sm:mt-64 md:mt-72">
                <FadeIn className="max-w-3xl">
                    <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                        {t("homeDevTitle")}
                    </h1>
                    <p className="mt-6 text-xl text-neutral-600">
                        {t("homedevDescription")}
                    </p>
                </FadeIn>
            </Container>

            <Clients />

            <CaseStudiess />

            {/* <Testimonial
                className="mt-24 sm:mt-32 lg:mt-40"
            >
                The team at Studio went above and beyond with our onboarding, even
                finding a way to access the user’s microphone without triggering one of
                those annoying permission dialogs.
            </Testimonial> */}

            <Services/>
        </>
    );
}

export default HomeDev;
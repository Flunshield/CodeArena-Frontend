import { Container } from "../../ComposantsCommun/Container";
import { FadeIn } from "../../ComposantsCommun/FadeIn";
import Clients from "./homeDev/Client";
import CaseStudiess from "./homeDev/CaseStudiess";
import { Testimonial } from "./homeDev/Testimonial";
import Services from "./homeDev/Services";

const HomeDev = () => {
    
    return (
        <>
            <Container className="mt-80 sm:mt-64 md:mt-72">
                <FadeIn className="max-w-3xl">
                    <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                        Award-winning development studio based in Denmark.
                    </h1>
                    <p className="mt-6 text-xl text-neutral-600">
                        We are a development studio working at the intersection of design
                        and technology. It’s a really busy intersection though — a lot of
                        our staff have been involved in hit and runs.
                    </p>
                </FadeIn>
            </Container>

            <Clients />

            <CaseStudiess />

            <Testimonial
                className="mt-24 sm:mt-32 lg:mt-40"
            >
                The team at Studio went above and beyond with our onboarding, even
                finding a way to access the user’s microphone without triggering one of
                those annoying permission dialogs.
            </Testimonial>

            <Services/>
        </>
    );
}

export default HomeDev;

import { Container } from "../../../ComposantsCommun/Container"
import { FadeIn, FadeInStagger } from "../../../ComposantsCommun/FadeIn"
import { SectionIntro } from "../../../ComposantsCommun/SectionIntro"

function CaseStudies(){
    return (
      <>
        <SectionIntro
          title="Harnessing technology for a brighter future"
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            We believe technology is the answer to the world’s greatest
            challenges. It’s also the cause, so we find ourselves in bit of a
            catch 22 situation.
          </p>
        </SectionIntro>
        <Container className="mt-16">
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
           
              <FadeIn  className="flex">
                <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                  <h3>
                  
                      <span className="absolute inset-0 rounded-3xl" />
                     <p>Image there</p>
                  </h3>
                  <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                    <time
                      dateTime={"1025369"}
                      className="font-semibold"
                    >
                      {"1025369"}
                    </time>
                    <span className="text-neutral-300" aria-hidden="true">
                      /
                    </span>
                    <span>Case study</span>
                  </p>
                  <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                    I'm a title
                  </p>
                  <p className="mt-4 text-base text-neutral-600">
                    I'm a description
                  </p>
                </article>
              </FadeIn>

          </FadeInStagger>
        </Container>
      </>
    )
  }

  export default CaseStudies
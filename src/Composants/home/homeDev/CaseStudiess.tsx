import { Container } from "../../../ComposantsCommun/Container";
import { FadeIn, FadeInStagger } from "../../../ComposantsCommun/FadeIn";
import { SectionIntro } from "../../../ComposantsCommun/SectionIntro";

// Exemples de données de cas pour afficher plusieurs images par carte
const CASE_STUDIES = [
  {
    id: "1",
    title: "Compétition",
    description: "Combattez vos adversaires pour devenir le meilleur",
    images: [
      { src: "/assets/icones/Competition.jpg", alt: "Compétition" },
    ]
  },
  {
    id: "2",
    title: "Événements",
    description: "Participer à des événement en tout genre pour vous démarquez au prés des particuliers",
    images: [
      { src: "/assets/icones/Event.jpg", alt: "Événements" },
    ]
  },
  {
    id: "3",
    title: "Puzzle",
    description: "Entrainez vous à la résolution de puzzle et stimulez votre cerveau pour les résoudre !",
    images: [
      { src: "/assets/icones/puzzle.jpg", alt: "Puzzle" },
    ]
  },
];

function CaseStudies() {
  return (
    <>
      <SectionIntro
        title="Amusez-vous, la totalité de Code Arena est gratuit pour un développeur"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Jouez seul, ou contre vos amis et des inconnus. Prouvez que vous êtes le meilleur des développeurs.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {CASE_STUDIES.map((caseStudy) => (
            <FadeIn key={caseStudy.id} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <div className="flex justify-center mb-4">
                  {caseStudy.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className="w-64 h-64 object-contain mx-2"
                    />
                  ))}
                </div>
                <h3>
                  <span className="absolute inset-0 rounded-3xl" />
                </h3>
                
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  );
}

export default CaseStudies;

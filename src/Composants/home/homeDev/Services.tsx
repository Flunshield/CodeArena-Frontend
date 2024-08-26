import { Container } from "../../../ComposantsCommun/Container";
import { FadeIn } from "../../../ComposantsCommun/FadeIn";
import { ItemList } from "../../../ComposantsCommun/ItemList";
import { List } from "../../../ComposantsCommun/List";
import { SectionIntro } from "../../../ComposantsCommun/SectionIntro";

function Services() {
    return (
      <>
        <SectionIntro
          title="Notre objectif : aider les developpeurs à améliorer leur compétences en prenant du plaisir "
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
           Aussi longtemps que Code Arena existera noous chercherons en permanence à améliorer la jouabilité et l&apos;accessibilité de notre application.
           Mais également accroitre la visibilité du métier de développeurs en facilitant l&apos;accès a de nombreux poste disponible.
          </p>
          <p>
            Code Arena permettera l&apos;accessibilité à différent métiers : 
          </p>
        </SectionIntro>
        <Container className="mt-16">
          <div className="lg:flex lg:items-center lg:justify-end">
            <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
              <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
               
              </FadeIn>
            </div>
            <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
              <ItemList  id="List" title="Développeur Web">
                En effet, suite à l&apos;application et la résolution de nos problèmes proposé vous pouvez obtenir les compétences nécessaires requise à l&apos;exersion de ce métier
              </ItemList>
              <ItemList id="List" title="Développeur d'application mobile">
                Développeur d&apos;application sera également envisageable au cours de formation et de résolution de nos puzzle.
                Notamment via des langages orienté objet comme C / C++ / C # et bien d&apos;autre.
              </ItemList>
              <ItemList id="List" title="Développeur de jeu vidéo">
                Notamment avec nos futur multiples langages de programmation orienté objet qui seront présent, vous permetterons d&apos;avoir des base solides pour le développemennt de jeu vidéo
              </ItemList>
            </List>
          </div>
        </Container>
      </>
    )
  }

  export default Services
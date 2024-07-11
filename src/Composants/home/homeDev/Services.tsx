import { Container } from "../../../ComposantsCommun/Container";
import { FadeIn } from "../../../ComposantsCommun/FadeIn";
import { ItemList } from "../../../ComposantsCommun/ItemList";
import { List } from "../../../ComposantsCommun/List";
import { SectionIntro } from "../../../ComposantsCommun/SectionIntro";

function Services() {
    return (
      <>
        <SectionIntro
          title="We help you identify, explore and respond to new opportunities."
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            As long as those opportunities involve giving us money to re-purpose
            old projects — we can come up with an endless number of those.
          </p>
        </SectionIntro>
        <Container className="mt-16">
          <div className="lg:flex lg:items-center lg:justify-end">
            <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
              <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
               
              </FadeIn>
            </div>
            <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
              <ItemList  id="List" title="Web development">
                We specialise in crafting beautiful, high quality marketing pages.
                The rest of the website will be a shell that uses lorem ipsum
                everywhere.
              </ItemList>
              <ItemList id="List" title="Application development">
                We have a team of skilled developers who are experts in the latest
                app frameworks, like Angular 1 and Google Web Toolkit.
              </ItemList>
              <ItemList id="List" title="E-commerce">
                We are at the forefront of modern e-commerce development. Which
                mainly means adding your logo to the Shopify store template we’ve
                used for the past six years.
              </ItemList>
              <ItemList id="List" title="Custom content management">
                At Studio we understand the importance of having a robust and
                customised CMS. That’s why we run all of our client projects out
                of a single, enormous Joomla instance.
              </ItemList>
            </List>
          </div>
        </Container>
      </>
    )
  }

  export default Services
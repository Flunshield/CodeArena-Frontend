import { Container } from "../../../ComposantsCommun/Container";
import { FadeIn, FadeInStagger } from "../../../ComposantsCommun/FadeIn";



const clients = [
  ['Phobia'],
  ['Family Fund'],
  ['Unseal'],
  ['Mail Smirk'],
  ['Home Work'],
  ['Green Life'],
  ['Bright Path'],
  ['North Adventures'],
]

function Clients() {
  return (
    <div className="mt-24 rounded-2xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-tertiari sm:text-left">
            Nous serons sous peu mis en relation avec différents structures comme des écoles où même des entreprises de techs.
            
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client]) => (
              <li key={client}>
            
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

export default Clients

import { Container } from "../../../ComposantsCommun/Container";
import { FadeIn, FadeInStagger } from "../../../ComposantsCommun/FadeIn";
import { LANGUAGE_USE, LANGUAGE_NOTUSE } from "../../../constantes/constanteEntreprise.ts";


function Clients() {
  return (
    <div className="mt-24 rounded-2xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-tertiari sm:text-left">
            Apprenez à coder avec code arena, nous possèdons que un seul langage pour le moment.


          </h2>
          <div className="h-px flex-auto bg-neutral-800" />

        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {LANGUAGE_USE.map((client, index) => (
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
        <FadeIn>
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-tertiari sm:text-left mt-4">
            Il nous reste à prévoir l'implémentation d'autre langage de programmation pour les prochaines mise à jour de notre application web.

          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {LANGUAGE_NOTUSE.map((client, index) => (
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
  )
}

export default Clients

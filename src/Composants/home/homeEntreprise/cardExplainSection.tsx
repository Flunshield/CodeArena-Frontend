import {CARD_EXPLANATION} from "../../../constantes.ts";

const CardExplainSection = () => {
    return (
        <div>
            <h2 className="text-tertiari m-2 text-center text-xl sm:text-6xl font-bold">Les avantages de CodeArena pour les
                entreprises</h2>
            <ul className="flex flex-col m-10 xl:grid grid-cols-1 md:grid-cols-2 gap-6">
                {CARD_EXPLANATION.map((card, index) => (
                    <li key={index} className="bg-tertiari rounded-lg p-6 shadow-md">
                        <h3 className="text-xl text-center font-semibold mb-4">{card.title}</h3>
                        <p className="text-gray-700">
                            {card.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CardExplainSection;
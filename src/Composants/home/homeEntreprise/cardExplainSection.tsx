import {CARD_EXPLANATION} from "../../../constantes.ts";

const CardExplainSection = () => {
    return (
        <><h2 className="text-3xl text-white font-bold mb-4">Les avantages de CodeArena pour les
            entreprises</h2>
            <ul className="flex flex-col xl:grid grid-cols-1 md:grid-cols-2 gap-6">
                {CARD_EXPLANATION.map((card, index) => (
                    <li key={index} className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                        <p className="text-gray-700">
                            {card.description}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CardExplainSection;
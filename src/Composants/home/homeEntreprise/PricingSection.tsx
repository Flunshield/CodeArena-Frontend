import {PRICING} from "../../../constantes.ts";

const PricingSection = () => {
    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl text-white font-bold mb-4">Choisissez le plan qui convient le mieux à vos besoins</h2>
            <div className="flex flex-col xl:grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRICING.map((plan, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-md cursor-pointer" onClick={plan.onclick}>
                        <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
                        <p className="text-gray-700">{plan.description}</p>
                        <ul className="list-disc list-inside mt-2">
                            {plan.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                        <p className="text-gray-700 mt-4">{plan.idealFor}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PricingSection;
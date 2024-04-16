import {PRICING} from "../../../constantes.ts";
import {useAuthContext} from "../../../AuthContext.tsx";
import {handleCheckout} from "../../../Helpers/apiHelper.ts";
import {useNavigate} from "react-router-dom";

const PricingSection = () => {
    const authContext = useAuthContext();
    const isConnect = authContext?.connected;
    const navigate = useNavigate();

    const handleCheckoutBtn = (url: string, idApi: string) => {
        if (url && idApi) {
            handleCheckout(url ?? "", {token: authContext.accessToken ?? "", idApi: idApi})
                .then(response => {
                    return response.json(); // Parse la réponse JSON
                })
                .then(data => {
                    window.location.href = data.message;
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération du message :", error);
                    // Traitez les erreurs ici
                });
        } else {
            navigate("/success")
        }
    }

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl text-white font-bold mb-4">Choisissez le plan qui convient le mieux à vos
                besoins</h2>
            <div className="flex flex-col xl:grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRICING.map((plan, index) => (
                    <div key={index}
                         className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <h3 className="text-4xl font-semibold mb-4 text-center">{plan.title}</h3>
                        <p className="text-gray-700">{plan.description}</p>
                        <ul className="list-disc list-inside mt-2">
                            {plan.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                        <p className="text-gray-700 mt-4">{plan.idealFor}</p>
                        {isConnect && (
                            <div>
                                <h2 className="text-2xl mt-10">
                                    Prix : <span className="text-green-400 font-bold">{plan.price}</span>
                                </h2>
                                <button onClick={() => handleCheckoutBtn(plan.url ?? "", plan.idApi ?? "")}
                                        className="block w-full mt-10 border-2 border-secondary bg-secondary text-white rounded-lg p-2">
                                    Acheter
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PricingSection;
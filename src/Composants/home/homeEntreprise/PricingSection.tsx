import {useAuthContext} from "../../../AuthContext.tsx";
import {handleCheckout} from "../../../Helpers/apiHelper.ts";
import {useNavigate} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import clsx from "clsx";
import {PRICING} from "../../../constantes/constanteEntreprise.ts";
import {useTranslation} from "react-i18next";
import {DataToken} from "../../../Interface/Interface.ts";
import {JwtPayload} from "jwt-decode";
import Button from "../../../ComposantsCommun/Button.tsx";
import {GROUPS} from "../../../constantes/constantes.ts";

const PricingSection = () => {
    const {t} = useTranslation();
    const authContext = useAuthContext();
    const infosUser = authContext?.infosUser as JwtPayload;
    const infos = infosUser?.aud as unknown as DataToken;
    const navigate = useNavigate();
    const handleCheckoutBtn = (url: string, idApi: string, typePayment: string) => {
        if (url && idApi) {
            handleCheckout(url ?? "", {token: authContext.accessToken ?? "", idApi: idApi, typePayment: typePayment})
                .then(response => {
                    return response.json(); // Parse la réponse JSON
                })
                .then(data => {
                    window.location.href = data.message;
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération du message :", error);
                });
        } else {
            navigate("/success")
        }
    }

    return (
        <div id="PricingSection" className="container mx-auto py-8">
            <h2 className="text-tertiari m-2 text-center text-xl sm:text-6xl font-bold">{t("choosePlan")}</h2>
            {infos && infos.data.groups.roles === GROUPS.ENTREPRISE &&
                <div className="bg-[#D63864] rounded-lg border-l-4 border-red-500 text-tertiari p-4 m-10 mb-0"
                     role="alert">
                    <p className="font-bold">Attention !</p>
                    <p>Un plan est déja actif, vous ne npouvez donc pas en prendre un nouveau plan sans annuler le
                        précédent.</p>
                </div>
            }
            <div className="flex flex-col xl:grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRICING.map((plan, index) => (
                    <div key={index}
                         className={clsx(isMobile ? "" : "transition duration-300 ease-in-out transform hover:scale-105", "bg-tertiari m-10 rounded-lg p-6 shadow-md flex flex-col justify-between")}
                    >
                        <h3 className="text-4xl font-semibold mb-4 text-center">{t(plan.title)}</h3>
                        <p className="text-gray-700">{t(plan.description)}</p>
                        <ul className="list-disc list-inside mt-2">
                            {plan.features.map((feature, idx) => (
                                <li key={idx}>{t(feature)}</li>
                            ))}
                        </ul>
                        <p className="text-gray-700 mt-4">{t(plan.idealFor)}</p>
                        <div>
                            <h2 className="text-2xl mt-10 text-center">
                                <span className="font-bold">{t(plan.price)}</span> <span
                                className="text-sm">/{t("perYear")}</span>
                            </h2>
                            {authContext.connected && infos.data.groups.roles === GROUPS.USER &&
                                <Button type="submit" id={plan.title}
                                        onClick={() => handleCheckoutBtn(plan.url ?? "", plan.idApi ?? "", plan.typePayment ?? "")}
                                        className="block w-full mt-10 border-2 border-secondary bg-secondary text-tertiari rounded-lg p-2">
                                    {t("buy")}
                                </Button>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PricingSection;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ENTREPRISE_TRUST} from "../../../constantes/constanteEntreprise.ts";
import {useTranslation} from "react-i18next";

const TrustSection = () => {
    const {t} = useTranslation();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1470, // Pour les écrans de taille moyenne
                settings: {
                    slidesToShow: 3 // Affiche 2 logos par diapositive
                }
            },
            {
                breakpoint: 1200, // Pour les petits écrans
                settings: {
                    slidesToShow: 2 // Affiche 1 logo par diapositive
                }
            },
            {
                breakpoint: 950, // Pour les petits écrans
                settings: {
                    slidesToShow: 1 // Affiche 1 logo par diapositive
                }
            }
        ]
    };

    return (
        <div id="TrustSection" className="bg-gray-100 py-8 rounded-lg m-auto w-2/3">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">{t("trustSection")}</h2>
                <Slider {...settings}>
                    {ENTREPRISE_TRUST.map((client, index) => (
                        <div key={index} className="flex flex-col">
                            <h2 className="text-center text-xl">{client.name}</h2>
                            <img key={index} src={client.src} alt={client.alt} className="mx-auto"/>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default TrustSection;

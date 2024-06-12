import { FadeIn, FadeInStagger } from "../../ComposantsCommun/FadeIn";
import tree from "/assets/tree.svg";
import { useTranslation } from "react-i18next";

const HomeDev = () => {
    const { t } = useTranslation();
    return (
        <FadeInStagger>
            <div className="flex flex-row justify-between mt-16 mb-24">
                <div className="flex flex-col mx-auto py-8 pt-32 z-20">
                    <FadeIn duration={0.6}>
                        <h1 id="slogan"
                            className="text-tertiari m-2 text-center text-xl sm:text-6xl font-bold"> {t('slogan')}</h1>
                    </FadeIn>
                   
                </div>
                <img
                    className="bg-primary hidden xl:block absolute right-0 -z-10"
                    src={tree}
                    alt="arbre design"
                    id="arbre"
                />
            </div>
        </FadeInStagger>
    );
}

export default HomeDev;
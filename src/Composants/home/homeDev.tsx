import tree from "/assets/tree.svg";
import Layout from "../../ComposantsCommun/Layout.tsx";
import {useTranslation} from "react-i18next";

const HomeDev = () => {
    const {t} = useTranslation();
    return (
        <Layout>
            <div className="flex flex-row justify-between top-0 mr-60">
                <div className="mx-auto py-8 pt-32 z-20  ml-32 mr-32">
                    <h1 id="slogan" className="text-white text-6xl font-bold"> {t('slogan')}</h1>
                    <iframe width="74%" height="585px"
                            src="https://www.youtube.com/embed/6MOrkDPTnLk?si=ABq0UmWjCbjcfkNu"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="m-24 border-2 border-white">
                    </iframe>
                </div>
                <img
                    className="bg-primary hidden xl:block absolute right-0 -z-10"
                    src={tree}
                    alt="arbre design"
                    id="arbre"
                />
            </div>
        </Layout>
    );
}

export default HomeDev;
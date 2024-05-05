import tree from "/assets/tree.svg";
import {useTranslation} from "react-i18next";

const HomeDev = () => {
    const {t} = useTranslation();
    return (
        <div className="flex flex-row justify-between mt-16 mb-24">
            <div className="flex flex-col mx-auto py-8 pt-32 z-20">
                <h1 id="slogan"
                    className="text-tertiari m-2 text-center text-xl sm:text-6xl font-bold"> {t('slogandxcxc')}</h1>
                <iframe width="90%" height="500px"
                        src="https://www.youtube.com/embed/6MOrkDPTnLk?si=ABq0UmWjCbjcfkNu"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="m-auto mt-10 mb-10 border-2 border-tertiari">
                </iframe>
            </div>
            <img
                className="bg-primary hidden xl:block absolute right-0 -z-10"
                src={tree}
                alt="arbre design"
                id="arbre"
            />
        </div>
    );
}

export default HomeDev;
import Layout from "../ComposantsCommun/Layout.tsx";
import Card from "../ComposantsCommun/Card.tsx";
import CardContent from "../ComposantsCommun/CardContent.tsx";
import tree from "../assets/tree.svg";
import { useTranslation } from "react-i18next";

function Home() {
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="flex flex-row justify-between top-0">
                <div className="relative mt-60 ml-10">
                    <div>
                        <h1 id="slogan" className="text-white text-6xl font-bold"> {t('slogan')}</h1>
                        <Card className="mt-32">
                            <CardContent className="p-10 bg-secondary text-white">
                                VIDEO ICI
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <img
                    className="bg-primary"
                    src={tree}
                    alt="arbre design"
                />
            </div>
        </Layout>
    );
}

export default Home;

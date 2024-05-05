import Layout from "../../ComposantsCommun/Layout.tsx";
import Card from "../../ComposantsCommun/Card.tsx";
import {useTranslation} from "react-i18next";

function Cancel () {
    const {t} = useTranslation();

    return (
        <Layout>
            <div className="m-64 text-center">
                <Card className="bg-secondary text-tertiari p-32">
                    <h1 className="text-tertiari text-2xl">{t("annuleOrder")}</h1>
                    <p> {t("msgRedirectionLink")} <a href={"/"} className="text-blue-700">{t("link")}.</a>
                    </p>
                </Card>
            </div>
        </Layout>
    )
}

export default Cancel;
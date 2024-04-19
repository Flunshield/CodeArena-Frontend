import Layout from "../../ComposantsCommun/Layout.tsx";
import Card from "../../ComposantsCommun/Card.tsx";

const Cancel = () => {
    return (
        <Layout>
            <div className="m-64 text-center">
                <Card className="bg-secondary text-tertiari p-32">
                    <h1 className="text-tertiari text-2xl">Commande annulé, vous allez être redirigé</h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p> Si vous n'êtes pas redirigé, vous pouvez cliquez sur ce <a href={"/"} className="text-blue-700">lien.</a>
                    </p>
                </Card>
            </div>
        </Layout>
    )
}

export default Cancel;
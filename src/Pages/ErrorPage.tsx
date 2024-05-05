import Layout from "../ComposantsCommun/Layout.tsx";

function ErrorPage () {
    return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-4 shadow-lg rounded-lg">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-tertiari">Erreur 404</h1>
                    <p className="mt-4 text-lg md:text-xl lg:text-2xl text-center text-soft-gray">Page non trouvée</p>
                </div>
            </div>
        </Layout>
    );
}

export default ErrorPage;
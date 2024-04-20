import Layout from "./Layout.tsx";

const CookiePolicyPage = () => {
    return (
        <Layout>
            <div className="container mx-auto p-6 text-tertiari mt-32 mb-32">
                <h1 className="text-2xl font-bold mb-4">Politique en matière de cookies</h1>
                <p className="mb-4">
                    Notre site utilise des cookies pour améliorer votre expérience utilisateur et pour fournir des
                    fonctionnalités telles que l&lsquo;authentification.
                </p>
                <h2 className="text-xl font-bold mb-2">Qu&lsquo;est-ce qu&lsquo;un cookie ?</h2>
                <p className="mb-4">
                    Un cookie est un petit fichier texte stocké sur votre ordinateur ou votre appareil mobile par le
                    navigateur Web lorsque vous visitez un site Web. Les cookies sont largement utilisés pour permettre
                    aux sites Web de fonctionner de manière efficace et de fournir des informations aux propriétaires du
                    site.
                </p>
                <h2 className="text-xl font-bold mb-2">Utilisation des cookies pour l&lsquo;authentification</h2>
                <p className="mb-4">
                    Nous utilisons des cookies pour stocker le refresh token de l&lsquo;authentification. Le refresh token est
                    un jeton d&lsquo;authentification à long terme qui permet à un utilisateur de rester connecté à notre site
                    pendant une période prolongée sans avoir à se reconnecter à chaque visite.
                </p>
                <p className="mb-4">
                    L&lsquo;utilisation de cookies pour stocker le refresh token permet à notre site de reconnaître votre
                    appareil et de vous authentifier automatiquement lorsque vous revenez sur notre site, améliorant
                    ainsi votre expérience utilisateur.
                </p>
                <h2 className="text-xl font-bold mb-2">Gestion des cookies</h2>
                <p className="mb-4">
                    Vous avez le contrôle total sur l&lsquo;acceptation ou le refus des cookies sur notre site. Vous pouvez
                    modifier vos préférences de cookies à tout moment en accédant aux paramètres de votre navigateur.
                </p>
                <p className="mb-4">
                    Toutefois, veuillez noter que le refus des cookies peut affecter certaines fonctionnalités de notre
                    site et entraîner une expérience utilisateur limitée.
                </p>
                <p className="mb-4">
                    En continuant à utiliser notre site, vous consentez à notre utilisation des cookies conformément à
                    cette politique en matière de cookies.
                </p>
            </div>
        </Layout>
    );
};

export default CookiePolicyPage;

export const MAIL = "contact@codearena.fr"
export const NO_PHOTO = "/assets/photosProfiles/noImage.png"

export const imagePaths: string[] = [
    'badge2.png',
    'badge3.png',
    'badge4.png',
    'badge5.png',
    'badge6.png',
    'badge7.png',
    'badge8.png',
    'badge9.png'
];

export const badgesPath: string[] = [
    'badge1.png',
    'badge2.png',
    'badge3.png',
    'badge4.png',
    'badge5.png',
    'badge6.png',
    'badge7.png',
    'badge8.png',
    'badge9.png'
];

export const GROUPS = {
    ADMIN: "Admin",
    USER: "User",
    ENTREPRISE: "Entreprise",
}

// Routage interne

export const COMPTE = "/myAccount"
export const RANKED = "/ranked"
export const RANKING = "/ranking"
export const TOURNAMENT = "/tournament"
export const EVENT = "/event"
export const ADMIN = "/admin"
export const LOGOUT = "/logout"
export const DASHBOARD = "/dashboard"
export const LOGIN = "/login"
export const REGISTER = "/signUp"
export const HOME = "/"
export const FORGOT_PASSWORD = "/forgotPassword"
export const RESET_PASSWORD = "/changePassword"
export const ENTREPRISE = "/entreprise"
export const SUCCESS = "/success"
export const CANCEL = "/cancel"

const URL_STRIPE = "stripe/create-checkout-session"

export const CARD_EXPLANATION = [
    {
        title: "Recrutement efficace",
        description: "Utilisez les défis de codage pour évaluer les compétences techniques des candidats de manière pratique et efficace."
    },
    {
        title: "Formation continue",
        description: "Offrez à vos employés des défis de programmation pour les aider à perfectionner leurs compétences et à rester à jour avec les dernières technologies."
    },
    {
        title: "Team building",
        description: "Organisez des compétitions de codage en équipe pour renforcer la collaboration et la cohésion au sein de votre entreprise."
    },
    {
        title: "Identification des talents",
        description: "Découvrez et engagez les meilleurs développeurs en observant leurs performances dans des défis de programmation en temps réel."
    }
]

export const PRICING = [
    {
        title: "Essentiel",
        description: "Profitez de notre offre gratuite pour démarrer",
        features: [
            "10 tests annuels",
            "Accès à une sélection de défis",
            "Support de base par e-mail"
        ],
        idealFor: "Parfait pour les petites équipes et les débutants qui veulent explorer Coding Game.",
        price: "Gratuit",
        url: "",
        idApi: ""
    },
    {
        title: "Premium",
        description: "Débloquez des fonctionnalités avancées pour un prix abordable",
        features: [
            "100 tests annuels",
            "Accès à une plus grande variété de défis",
            "Support prioritaire par e-mail",
            "Statistiques détaillées sur les performances"
        ],
        idealFor: "Idéal pour les équipes en pleine croissance qui ont besoin d'un soutien supplémentaire.",
        price: "49,99€",
        url: URL_STRIPE,
        idApi: "price_1P2aZvFoLa8m0nzy2y836Oek"
    },
    {
        title: "Entreprise",
        description: "Pour les entreprises qui cherchent à maximiser leur potentiel",
        features: [
            "Tests illimités",
            "Accès à tous les défis disponibles",
            "Support premium 24/7",
            "Personnalisation de l'environnement de travail",
            "Formation et intégration sur mesure"
        ],
        idealFor: "Conçu pour les entreprises ambitieuses qui visent l'excellence et la croissance.",
        price: "199,99€",
        url: URL_STRIPE,
        idApi: "price_1P2rhEFoLa8m0nzygBawhBWC"
    }
];


export const ENTREPRISE_TRUST = [
    {
        src: "/src/assets/logoEntreprisetrust/OIG1.jpeg",
        alt: "AuroraTech ",
        name: "AuroraTech"
    },
    {
        src: "/src/assets/logoEntreprisetrust/OIG2.jpeg",
        alt: "BistroVibe",
        name: "BistroVibe"
    },
    {
        src: "/src/assets/logoEntreprisetrust/OIG3.jpeg",
        alt: "EcoVenture",
        name: "EcoVenture"
    },
    {
        src: "/src/assets/logoEntreprisetrust/OIG1.jpeg",
        alt: "InnovaSphere",
        name: "InnovaSphere"
    },
    {
        src: "/src/assets/logoEntreprisetrust/OIG2.jpeg",
        alt: "GastronHome ",
        name: "GastronHome "
    },
    {
        src: "/src/assets/logoEntreprisetrust/OIG3.jpeg",
        alt: "TechNova",
        name: "TechNova"
    }
]
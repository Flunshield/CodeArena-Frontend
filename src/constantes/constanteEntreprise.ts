
const URL_STRIPE = "stripe/create-checkout-session"

export const CARD_EXPLANATION = [
    {
        title: "recrutementEfficace",
        description: "recrutementEfficaceDescription"
    },
    {
        title: "formationContinue",
        description: "formationContinueDescription"
    },
    {
        title: "teamBuilding",
        description: "teamBuildingDescription"
    },
    {
        title: "identificationTalent",
        description: "identificationTalentDescription"
    }
];

export const PRICING = [
    {
        title: "essentiel",
        description: "essentielDesciption",
        features: [
            "essentielFeature1",
            "essentielFeature2",
            "essentielFeature3"
        ],
        idealFor: "essentielIdeaFor",
        price: "Gratuit",
        url: "",
        idApi: ""
    },
    {
        title: "premium",
        description: "premiumDescription",
        features: [
            "premiumFeature1",
            "premiumFeature2",
            "premiumFeature3",
            "premiumFeature4"
        ],
        idealFor: "premiumIdeaFor",
        price: "49,99€",
        url: URL_STRIPE,
        idApi: "price_1P2aZvFoLa8m0nzy2y836Oek"
    },
    {
        title: "entreprise",
        description: "entrepriseDescription",
        features: [
            "entrepriseFeature1",
            "entrepriseFeature2",
            "entrepriseFeature3",
            "entrepriseFeature4",
            "entrepriseFeature5"
        ],
        idealFor: "entrepriseIdeaFor",
        price: "199,99€",
        url: URL_STRIPE,
        idApi: "price_1P2rhEFoLa8m0nzygBawhBWC"
    }
];

export const ENTREPRISE_TRUST = [
    {
        src: "/assets/logoEntreprisetrust/OIG1.jpeg",
        alt: "AuroraTech ",
        name: "AuroraTech"
    },
    {
        src: "/assets/logoEntreprisetrust/OIG2.jpeg",
        alt: "BistroVibe",
        name: "BistroVibe"
    },
    {
        src: "/assets/logoEntreprisetrust/OIG3.jpeg",
        alt: "EcoVenture",
        name: "EcoVenture"
    },
    {
        src: "/assets/logoEntreprisetrust/OIG1.jpeg",
        alt: "InnovaSphere",
        name: "InnovaSphere"
    },
    {
        src: "/assets/logoEntreprisetrust/OIG2.jpeg",
        alt: "GastronHome ",
        name: "GastronHome "
    },
    {
        src: "/assets/logoEntreprisetrust/OIG3.jpeg",
        alt: "TechNova",
        name: "TechNova"
    }
]
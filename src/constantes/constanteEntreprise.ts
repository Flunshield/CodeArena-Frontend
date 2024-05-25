
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
        title: "Premium",
        nbCreateTest: "100",
        description: "premiumDescription",
        features: [
            "premiumFeature1",
            "premiumFeature2",
            "premiumFeature3",
            "premiumFeature4"
        ],
        idealFor: "premiumIdeaFor",
        price: "10€/mois",
        url: URL_STRIPE,
        idApi: "price_1PKGuGFoLa8m0nzy88vB7lvd",
        typePayment: "subscription"
    },
    {
        title: "Entreprise",
        nbCreateTest: "99999",
        description: "entrepriseDescription",
        features: [
            "entrepriseFeature1",
            "entrepriseFeature2",
            "entrepriseFeature3",
            "entrepriseFeature4",
            "entrepriseFeature5"
        ],
        idealFor: "entrepriseIdeaFor",
        price: "100€/mois",
        url: URL_STRIPE,
        idApi: "price_1PKHKWFoLa8m0nzyAWLDMBlQ",
        typePayment: "subscription"
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

export const DONNEES_TESTS = [
    {
        "name": "Test 1",
        "condition": "add(1, 2) === 3",
        "successMessage": "Test 1 réussi",
        "failureMessage": "Test 1 échoué"
    },
    {
        "name": "Test 2",
        "condition": "add(2, 6) === 8",
        "successMessage": "Test 2 réussi",
        "failureMessage": "Test 2 échoué"
    },
    {
        "name": "Test 3",
        "condition": "add(2, 3) === 5",
        "successMessage": "Test 3 réussi",
        "failureMessage": "Test 3 échoué"
    }
]
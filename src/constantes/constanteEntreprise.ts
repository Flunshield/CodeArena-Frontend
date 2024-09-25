
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
        title: "Pack premium",
        nbCreateTest: "100",
        description: "premiumDescription",
        features: [
            "premiumFeature1",
            "premiumFeature2",
            "premiumFeature3",
            "premiumFeature4"
        ],
        idealFor: "premiumIdeaFor",
        price: "70€",
        url: URL_STRIPE,
        idApi: "price_1PjFrZFoLa8m0nzy2vEhq1TG",
        typePayment: "subscription",
        btnAction: true
    },
    {
        title: "Pack entreprise",
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
        price: "300€",
        url: URL_STRIPE,
        idApi: "price_1PjFxQFoLa8m0nzylaifhB6O",
        typePayment: "subscription",
        btnAction: true
    },
    {
        title: "Partenariat",
        nbCreateTest: "",
        description: "Désireux d'offrir un partenariat à votre entreprise ? Contactez-nous pour en discuter.",
        features: [],
        idealFor: "Conçu pour les entreprises souhaitant un partenariat.",
        price: "Contactez-nous",
        url: "",
        idApi: "",
        typePayment: "",
        btnAction: false
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

export const EXP_CODE = [
    {
        src: "/assets/icones/Competition.jpg",
        alt: "Competition Logo",
        name: "Competition"
    },
    {
        src: "/assets/icones/Event.jpg",
        alt: "Event Logo",
        name: "Event"
    },
    {
        src: "/assets/icones/puzzle.jpg",
        alt: "puzzle Logo",
        name: "Puzzle"
    },
    {
        src: "/assets/icones/recrutement.jpg",
        alt: "recrutement Logo",
        name: "Recrutement"
    }
]
export const DEV_PICTURE = [
    {
        src: "/assets/dev.avif",
        alt: "Image d'un dévellopeur"
    }
]

export const LANGUAGE_USE = [
    {
        src: "/assets/icones/JS.png",
        alt: "Javascript Logo",
        name: "Javascript"
    }
]
export const LANGUAGE_NOTUSE = [
    {
        src: "/assets/icones/TS.png",
        alt: "Typescript Logo",
        name: "Typescript"
    },
    {
        src: "/assets/icones/php.svg",
        alt: "PHP Logo",
        name: "PHP"
    },
    {
        src: "/assets/icones/Ruby.png",
        alt: "Ruby Logo",
        name: "Ruby"
    },
    {
        src: "/assets/icones/Python.png",
        alt: "Python Logo",
        name: "Python"
    },
    {
        src: "/assets/icones/Java.svg",
        alt: "Java Logo",
        name: "Java"
    },
    {
        src: "/assets/icones/C.png",
        alt: "C Logo",
        name: "C"
    },
    {
        src: "/assets/icones/Csharp.png",
        alt: "Csharp Logo",
        name: "Csharp"
    },
    {
        src: "/assets/icones/C++.png",
        alt: "C++ Logo",
        name: "C++"
    },
    
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

export const HEADER_FACTURE = [
    { key: 'item', label: 'item' },
    { key: 'dateCommande', label: 'dateCommande' },
    { key: 'idPayment', label: 'idPayment' },
    { key: 'etatCommande', label: 'etatCommande' },
];

export const TIMER = [
    {
        value: 60,
        label: "1 minute"
    },
    {
        value: 120,
        label: "2 minutes"
    },
    {
        value: 180,
        label: "3 minutes"
    },
    {
        value: 240,
        label: "4 minutes"
    },
    {
        value: 300,
        label: "5 minutes"
    },
    {
        value: 360,
        label: "6 minutes"
    },
    {
        value: 420,
        label: "7 minutes"
    },
    {
        value: 480,
        label: "8 minutes"
    },
    {
        value: 540,
        label: "9 minutes"
    },
    {
        value: 600,
        label: "10 minutes"
    },
    {
        value: 660,
        label: "11 minutes"
    },
    {
        value: 720,
        label: "12 minutes"
    },
    {
        value: 780,
        label: "13 minutes"
    },
    {
        value: 840,
        label: "14 minutes"
    },
    {
        value: 900,
        label: "15 minutes"
    },
    {
        value: 960,
        label: "16 minutes"
    },
    {
        value: 1020,
        label: "17 minutes"
    },
    {
        value: 1080,
        label: "18 minutes"
    },
    {
        value: 1140,
        label: "19 minutes"
    },
    {
        value: 1200,
        label: "20 minutes"
    }
]
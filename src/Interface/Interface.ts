export interface User {
    id?: number;
    idCvUser?: number;
    token?: string;
    userName?: string;
    email?: string;
    emailVerified?: boolean;
    createdAt?: Date;
    lastLogin?: Date;
    status?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    groupsId?: number;
    groups?: Groups;
    languagePreference?: string;
    localisation?: string;
    titlesId?: number;
    titles?: Titles;
    data?: string[];
    badgesWin?: string[];
    titlesWin?: string[];
    company?: string;
    url?: string;
    school?: string;
    github?: string;
    presentation?: string;
    nbGames?: string;
    userRanking?: UserRanking[];
    siren?: string;
    commandeEntrepriseFormatted?: CommandeEntrepriseFormatted;
    userTournament?: UserTournament[];
}

export interface DataToken {
    data: {
        userTournament: UserTournament;
        userRanking: UserRanking;
        id?: number;
        groups: Groups;

    }
}

export interface Groups {
    id: number;
    name: string;
    roles: string;
}

export interface Titles {
    id?: number;
    value: string;
    label: string;
}

export interface shortUser {
    userName: string;
    password?: string;
    email?: string;
    id?: number;
    firstName?: string;
    lastName?: string;
}

export interface LoginForm {
    userName: string;
    password: string;
    token?: string
}

export interface NavFlags {
    value: string;
    displayLink: boolean;
    src?: string;
    alt?: string;
}

export interface Tournament {
    id: number,
    startDate: Date,
    endDate: Date,
    playerMax: number,
    title: string,
    description: string,
    displayStartDate?: string,
    numberRegistered: number,
}

export interface UserRanking extends request {
    id?: number;
    userID?: User;
    user?: User;
    rankingsID?: number;
    points?: number;
    rankings?: Ranking;
}

export interface request {
    token?: string
}

export interface userRangList {
    usersAbove: UserRanking[],
    user: UserRanking,
    usersBelow: UserRanking[]
}

export interface Event {
    id?: number;
    startDate: Date;
    endDate: Date;
    playerMax: number;
    title: string;
    description: string;
    rewards: string;
    organize: string;
    createPuzzles?: boolean;
    priceAdjustment?: number;
    basePrice?: number;
    priceDetails: priceDetails;
    matches?: Match[];
    userEvent?: UserEvent[];
    puzzles?: PuzzlesEntreprise[];
    accepted?: boolean;
    statusPayment?: string;
}

export interface News {
    title: string;
    date: string;
    description: string;
  }

export interface priceDetails {
    id: number;
    basePrice: number;
    proximityCharge: number;
    durationCharge: number;
    puzzlesCharge: number;
    adjustmentCharge: number;
    finalPrice: number;
}

export interface Match {
    id: number;
    date: Date;
    time: Date;
    location: string;
    status: string;
    score: number;
    eventId: number;
    event: Event;
    rankingsID: number;
    rankings: Ranking;
    winnerID: number;
    winner: {userName: string}
    looserID: number;
    loser: {userName: string}
    loserPoints: number;
    winnerPoints: number;

}

export interface UserEvent {
    id: number;
    userID: number;
    user: User;
    eventsID: number;
    events: Event;
    points: number;
}

export interface Ranking {
    id: number;
    startDate: Date;
    endDate: Date;
    title: string;
    description: string;
    rewards: string;
    matches: Match[];
    userRanking: UserRanking[];
    minPoints: string;
    maxPoints: string;
}

export interface UserTournament {
    id: number;
    userID: number;
    user: User;
    tournamentID: number;
    tournament: Tournament;
    points: number;
}

export interface responseTest {
    success: boolean;
    testPassed: string[];
    testFailed: string[];
}

export interface PuzzlesEntreprise {
    id?: number;
    userID?: number;
    user?: User;
    tests?: JSON[];
    details?: string;
    title?: string;
    time?: number;
}

export interface Pricing {
    title: string;
    nbCreateTest: string;
    description: string;
    features: string[];
    idealFor: string;
    price: string;
    url: string;
    idApi: string;
}

export interface CommandeEntreprise {
    id: number;
    idSession: string;
    objetSession: JSON;
    idPayment: string;
    item: string;
    userID: number;
    user: User;
    dateCommande: Date | string;
    etatCommande: string;
    nbCreateTest: number;
    colorEtatCommande?: string;
}

export interface lastCommandFormatted {
    id: number;
    item: string;
    dateCommande: string;
    idPayment: string;
    etatCommande: string;
    colorEtatCommande: string;
}

export interface CommandeEntrepriseFormatted {
    commande: CommandeEntreprise;
    pricing: Pricing;
}


export interface PuzzleSend {
    id: number;
    userID: number;
    user: User;
    puzzlesEntreprise: PuzzlesEntreprise;
    puzzlesEntrepriseId: number;
    sendDate: Date;
    firstName: string;
    lastName: string;
    email: string;
    commentaire: string;
    validated: boolean;
    result?: JSON;  // Devrait être adapté au format JSON attendu
    testValidated?: number;
    time?: string;
    verified?: boolean;
}

export interface ArrayItem {
    item: CommandeEntreprise[];
    total: number;
}

export interface listPuzzleEntreprise {
    item: PuzzlesEntreprise[];
    total: number;
}

export interface listUser {
    item: UserClassement[];
    total: number;
}

export interface listUserEntreprise {
    item: UserClassementEntreprise[];
    total: number;
}

export interface UserClassement {
    userName: string;
    userRanking: UserRanking[];
    points: string;
    nbGames: string;
}

export interface UserClassementEntreprise {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    userRanking: UserRanking[];
    points: string;
    nbGames: string;
    cvUser: CVFormState[];
}

export interface listPuzzleSend {
    item: PuzzleSend[];
    total: number;
    titles: [{ title: string }];
}

export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Skill {
    name: string;
}

export interface CVFormState {
    id: number;
    cvName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    experiences: Experience[];
    educations: Education[];
    technicalSkills: Skill[];
    softSkills: Skill[];
    activate?: boolean;
}
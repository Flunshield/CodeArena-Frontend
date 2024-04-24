export interface User {
    id?: number;
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
    languagePreference?: string;
    localisation?: string;
    titlesId?: number;
    titles?: Titles;
    data?: string[];
    badges?: string;
    company?: string;
    url?: string;
    school?: string;
    github?: string;
    presentation?: string;
    nbGames?: string;
    userRanking?: UserRanking[];
}

export interface DataToken {
    data: {
        id?: number;
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
        languagePreference?: string;
        localisation?: string;
        titlesId?: number;
        titles?: Titles;
        titlesWin?: string[];
        badgesWin?: string[];
        company?: string;
        url?: string;
        school?: string;
        github?: string;
        presentation?: string;
        userRanking?: UserRanking[];
        userTournament?: UserTournament[];
        groups: Groups;
        commandeEntreprise?: CommandeEntreprise[];
        puzzlesEntreprise: PuzzlesEntreprise[];
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
    numberRegistered : number,
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
    startDate?: Date;
    endDate?: Date;
    playerMax?: number;
    title?: string;
    description?: string;
    rewards?: string;
    organize?: string;
    matches?: Match[];
    userEvent?: UserEvent[];
}

export interface Match {
    id: number;
    date: Date;
    time: Date;
    location: string;
    status: string;
    score: number;
    tournamentID: number;
    tournament: Tournament;
    rankingsID: number;
    rankings: Ranking;
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

export interface CommandeEntreprise {
    id: number;
    idSession: string;
    objetSession: JSON;
    idPayment: string;
    item: string;
    userID: number;
    user: User;
    dateCommande: Date;
    etatCommande: string;
    nbCreateTest: number;
}

export interface PuzzlesEntreprise {
    id?: number;
    userID?: number;
    user?: User;
    tests?: JSON;
    details?: string;
}
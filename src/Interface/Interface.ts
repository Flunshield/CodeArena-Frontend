export interface NavRoute {
    route: string;
    label?: string;
    value?: string;
    displayLink: boolean;
}

export interface User {
    id?: number;
    userName: string;
    password: string;
    email: string;
    emailVerified?: boolean;
    createdAt?: Date;
    lastLogin?: Date;
    status?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    groupsId?: number;
    languagePreference?: string;
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
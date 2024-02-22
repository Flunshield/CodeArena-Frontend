// api.ts

import {LoginForm, shortUser, User} from "../Interface/Interface.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_URL;

/**
 * Effectue une requête de connexion à l'API.
 *
 * @param {string} endpoint - Le point de terminaison de l'API pour la connexion.
 * @param {LoginForm} data - Les données de connexion comprenant le nom d'utilisateur et le mot de passe.
 * @returns {Promise<Response>} Une promesse qui résout avec l'objet Response de la requête.
 */
export const login = async (endpoint: string, data: LoginForm): Promise<Response> => {

    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            userName: data.userName,
            password: data.password,
        }),
    });
}

/**
 * Effectue une requête de déconnexion à l'API.
 *
 * @param {string} endpoint - Le point de terminaison de l'API pour la déconnexion.
 * @returns {Promise<Response>} Une promesse qui résout avec l'objet Response de la requête.
 */
export const logout = async (endpoint: string): Promise<Response> => {

    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

/**
 * Effectue une requête pour créer un nouvel utilisateur via l'API.
 *
 * @param {string} endpoint - Le point de terminaison de l'API pour la création d'un utilisateur.
 * @param {shortUser} data - Les données de l'utilisateur comprenant le nom d'utilisateur, le mot de passe et l'adresse e-mail.
 * @returns {Promise<Response>} Une promesse qui résout avec l'objet Response de la requête.
 */
export const createUser = async (endpoint: string, data: shortUser): Promise<Response> => {
    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            userName: data.userName,
            password: data.password,
            email: data.email
        }),
    });
}

/**
 * Effectue une requête pour initier le processus de récupération de mot de passe via l'API.
 *
 * @param {string} endpoint - Le point de terminaison de l'API pour la récupération de mot de passe oublié.
 * @param {string} email - L'adresse e-mail associée au compte utilisateur pour la récupération de mot de passe.
 * @returns {Promise<Response>} Une promesse qui résout avec l'objet Response de la requête.
 */
export const forgotPassword = async (endpoint: string, email: string): Promise<Response> => {
    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email
        }),
    });
}

/**
 * Effectue une requête pour changer le mot de passe d'un utilisateur via l'API.
 *
 * @param {string} endpoint - Le point de terminaison de l'API pour la modification du mot de passe.
 * @param {LoginForm} data - Les données nécessaires à la modification du mot de passe, comprenant le nom d'utilisateur, le mot de passe et le jeton d'authentification.
 * @returns {Promise<Response>} Une promesse qui résout avec l'objet Response de la requête.
 */
export const changePassword = async (endpoint: string, data: LoginForm): Promise<Response> => {
    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            userName: data.userName,
            password: data.password
        }),
    });
}

/**
 * Effectue une requête pour mettre à jour les informations d'un utilisateur via l'API.
 *
 * @param {string | undefined} endpoint - Le point de terminaison de l'API pour la mise à jour des informations utilisateur.
 * @param {User | undefined} data - Les données utilisateur à mettre à jour, comprenant l'identifiant, le jeton d'authentification, et les nouvelles informations.
 * @returns {Promise<Response>} Une promesse qui résout avec l'objet Response de la requête.
 */
export const updateUser = async (endpoint?: string, data?: User): Promise<Response> => {

    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`,
        },
        body: JSON.stringify({
            userName: data?.userName,
            id: data?.id,
            avatar: data?.avatar,
            presentation: data?.presentation,
            localisation: data?.localisation,
            company: data?.company,
            school: data?.school,
            github: data?.github,
            url: data?.url,
            titles: data?.titles,
            lastName: data?.lastName,
            firstName: data?.firstName,
            titlesId: data?.titlesId as number,
        }),
        credentials: 'include'
    });
};

/**
 * Effectue une requête GET pour récupérer des éléments à partir d'un point de terminaison spécifié via l'API.
 *
 * @param {string} endpoint - Le point de terminaison de l'API pour la récupération des éléments.
 * @param {{ token: string }} data - Les données nécessaires à la requête, comprenant le jeton d'authentification.
 * @returns {Promise<Response>} Une promesse qui résout avec l'objet Response de la requête.
 * @throws {Error} Lance une erreur si la requête échoue.
 */
export const getElementByEndpoint = async (endpoint: string, data: { token: string }): Promise<Response> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`,
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('La requête a échoué');
        }

        return response;
    } catch (error) {
        console.error('Erreur lors de la requête', error);
        throw error;
    }
};

/**
 * Désinscrit un utilisateur d'un tournoi.
 * @param endpoint L'endpoint de l'API pour la désinscription du tournoi.
 * @param data Les données à envoyer pour la désinscription du tournoi.
 * @returns Une promesse qui se résout avec la réponse du serveur.
 */
export const unsubscribeTournament = async (endpoint?: string, data?: {
    token: string;
    userID?: string;
    tournamentID?: number
}): Promise<Response> => {

    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`,
        },
        body: JSON.stringify({
            userID: data?.userID,
            tournamentID: data?.tournamentID
        }),
        credentials: 'include'
    });
};

export const postElementByEndpoint = async (endpoint: string, data: { token: string, data: object }): Promise<Response> => {
    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`,
        },
        body: JSON.stringify({
            data: data.data
        }),
        credentials: 'include'
    });
};

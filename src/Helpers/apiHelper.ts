// api.ts

import {LoginForm, shortUser, Titles, User} from "../Interface/Interface.ts";

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL_BACK;

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
export const getElementByEndpoint = async (endpoint: string, data: { token: string, data: string }): Promise<Response> => {
    try {
        const queryString = new URLSearchParams({
            session_id: data.data
        }).toString();

        const response = await fetch(`${API_BASE_URL}/${endpoint}?${queryString}`, {
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

/**
 * Envoie une requête POST à un endpoint avec les données spécifiées.
 * @param {string} endpoint - L'URL de l'endpoint auquel envoyer la requête POST.
 * @param {object} data - Les données à envoyer dans le corps de la requête POST.
 * @param {string} data.token - Le jeton d'authentification à inclure dans l'en-tête de la requête.
 * @param {object} data.data - Les données à inclure dans le corps de la requête POST.
 * @returns {Promise<Response>} Une promesse qui résoudra avec la réponse de la requête.
 */
export const postElementByEndpoint = async (endpoint: string, data: {
    token: string,
    data: object
}): Promise<Response> => {
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

/**
 * Envoie une requête DELETE à une API pour supprimer un titre spécifié.
 * Cette fonction fait une requête DELETE à l'endpoint spécifié, en utilisant un token JWT pour l'authentification
 * et inclut les détails du titre à supprimer dans le corps de la requête.
 *
 * @param endpoint - L'endpoint à appeler pour la suppression, qui sera concaténé avec la base URL de l'API.
 * @param data - Un objet contenant le token d'authentification et le titre à supprimer.
 *               Le token est utilisé pour authentifier la requête.
 *               Le titre est l'objet à envoyer dans le corps de la requête pour spécifier quel titre doit être supprimé.
 * @returns Une promesse qui se résout avec la réponse HTTP obtenue suite à la requête DELETE.
 *
 * @example
 * deleteTitle('titles/delete', {
 *   token: 'jwt-token-here',
 *   title: { id: 'title-id', label: 'Example Title', value: 'example-value' }
 * });
 */
export const deleteTitle = async (endpoint?: string, data?: {
    token: string;
    title?: Titles;
}): Promise<Response> => {

    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`,
        },
        body: JSON.stringify({
            title: data?.title
        }),
        credentials: 'include'
    });
};

/**
 * Envoie une requête DELETE à une API pour supprimer un utilisateur spécifié.
 * Cette fonction effectue une requête DELETE à l'endpoint spécifié, utilisant un token JWT pour l'authentification
 * et inclut les détails de l'utilisateur à supprimer dans le corps de la requête.
 *
 * @param endpoint - L'endpoint à appeler pour la suppression, qui sera concaténé avec la base URL de l'API.
 * @param data - Un objet contenant le token d'authentification et l'utilisateur à supprimer.
 *               Le token est utilisé pour authentifier la requête.
 *               L'utilisateur est l'objet à envoyer dans le corps de la requête pour spécifier quel utilisateur doit être supprimé.
 * @returns Une promesse qui se résout avec la réponse HTTP obtenue suite à la requête DELETE.
 *
 * @example
 * deleteUser('users/delete', {
 *   token: 'jwt-token-here',
 *   user: { id: 'user-id', name: 'John Doe', email: 'john.doe@example.com' }
 * });
 */
export const deleteUser = async (endpoint?: string, data?: {
    token: string;
    user: User;
}): Promise<Response> => {

    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`,
        },
        body: JSON.stringify({
            user: data?.user
        }),
        credentials: 'include'
    });
}

/**
 * Envoie une requête PATCH à une API pour réinitialiser les points d'un utilisateur spécifié.
 * Cette fonction effectue une requête PATCH à l'endpoint spécifié, utilisant un token JWT pour l'authentification
 * et inclut les détails de l'utilisateur pour lequel les points doivent être réinitialisés dans le corps de la requête.
 *
 * @param endpoint - L'endpoint à appeler pour la réinitialisation des points, qui sera concaténé avec la base URL de l'API.
 * @param data - Un objet contenant le token d'authentification et l'utilisateur dont les points doivent être réinitialisés.
 *               Le token est utilisé pour authentifier la requête.
 *               L'utilisateur est l'objet à envoyer dans le corps de la requête pour spécifier pour quel utilisateur les points doivent être réinitialisés.
 * @returns Une promesse qui se résout avec la réponse HTTP obtenue suite à la requête PATCH.
 *
 * @example
 * resetPointsUser('users/reset-points', {
 *   token: 'jwt-token-here',
 *   user: { id: 'user-id', name: 'John Doe', email: 'john.doe@example.com' }
 * });
 */
export const resetPointsUser = async (endpoint?: string, data?: {
    token: string;
    user: User;
}): Promise<Response> => {

    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`,
        },
        body: JSON.stringify({
            user: data?.user
        }),
        credentials: 'include'
    });
}

/**
 * Envoie une requête POST à une API pour gérer une opération de paiement ou de commande spécifiée.
 * Cette fonction réalise une requête POST vers l'endpoint spécifié, utilisant un token JWT pour l'authentification.
 * Elle inclut les détails nécessaires (comme l'ID de l'API de paiement) dans le corps de la requête pour traiter l'opération.
 *
 * @param endpoint - L'endpoint de l'API auquel faire la requête POST, qui sera concaténé avec la base URL de l'API.
 * @param data - Un objet optionnel contenant le token d'authentification et l'identifiant de l'API nécessaire à l'opération.
 *               Le `token` est utilisé pour authentifier la requête auprès de l'API.
 *               `idApi` est l'identifiant nécessaire pour la requête spécifique à l'opération de paiement ou commande.
 * @returns Une promesse qui se résout avec la réponse HTTP obtenue suite à la requête POST.
 *
 * @example
 * handleCheckout('checkout/initiate', {
 *   token: 'jwt-token-here',
 *   idApi: 'api-id-for-operation'
 * });
 */
export const handleCheckout = async (endpoint: string, data?: {
    token: string;
    idApi: string;
}): Promise<Response> => {
    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            idApi: data?.idApi
        }),
    });
}
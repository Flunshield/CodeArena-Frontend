// api.ts

import {LoginForm, shortUser, User, UserRanking} from "../Interface/Interface.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_URL;

export const login = async (endpoint: string, data: LoginForm) => {

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

export const logout = async (endpoint: string) => {

    return await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export const createUser = async (endpoint: string, data: shortUser) => {
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

export const forgotPassword = async (endpoint: string, email: string) => {
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

export const changePassword = async (endpoint: string, data: LoginForm) => {
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

export const infosDashboardRequest = async (endpoint?: string, data?: UserRanking) => {
    return await fetch(`${API_BASE_URL}/${endpoint}?id=${data?.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`,
        },
        credentials: 'include'
    });
}

export const updateUser = async (endpoint?: string, data?: User) => {

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

export const getTitles = async (endpoint: string, data: { token: string }): Promise<Response> => {
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

export const getUserRanking = async (endpoint: string, data: { token: string, username?: string }): Promise<Response> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}?userName=${data.username}`, {
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

export const getAllTournaments = async (endpoint: string, data: { token: string }): Promise<Response> => {
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


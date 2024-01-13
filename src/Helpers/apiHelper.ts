// api.ts

import {LoginForm, User} from "../Interface/Interface.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_URL;

export const apiGet = async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la requête');
    }
    return response.json();
};

export const apiPost = async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la requête');
    }
    return response.json();
};

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

export const createUser = async (endpoint: string, data: User) => {

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

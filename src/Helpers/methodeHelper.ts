import {Pricing} from "../Interface/Interface.ts";

export function checkUrl(): string {
    const currentUrl = window.location.href;
    const segments = currentUrl.split('/');
    return segments[segments.length - 1];
}

export function getValueInUrl(value: string): string {
    const currentUrl = window.location.href;
    const segments = currentUrl.split('/');
    return segments[segments.indexOf(value) + 1];
}

export function checkNbTestCreated(nbPuzzleCreated: number, lastCommande: Pricing): boolean {
    return nbPuzzleCreated < parseInt(lastCommande?.nbCreateTest);
}

/**
 * Récupère la valeur d'un paramètre de l'URL.
 * @param paramName Le nom du paramètre à récupérer de l'URL.
 * @returns La valeur du paramètre ou null si le paramètre n'est pas trouvé.
 */
export function getQueryParamValue(paramName: string): string | null {
    // Supposons que vous voulez analyser l'URL courante, utilisez window.location.search
    // Si vous avez une URL spécifique sous forme de chaîne, remplacez `window.location.search` par cette chaîne.
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(paramName);
}

export function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Définir une fonction pour lire un cookie
export function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * Vérifie si un nombre est un nombre de Luhn. (Algorithme de Luhn)
 * @param number
 */
export function algoLuhn(number: string | number): boolean {
    let totalAmountnumber = 0;
    if (typeof number === 'number') {
        number = number.toString();
    }

    const numberReverse = number.split('').reverse().join('');
    for (let i = 0; i < numberReverse.length; i++) {
        let charAsNumber = parseInt(numberReverse[i]);
        if ((i + 1) % 2 === 0) {
            charAsNumber *= 2;
            if (charAsNumber >= 10) {
                const unit = parseInt(charAsNumber.toString().slice(-1));
                const tens = parseInt(charAsNumber.toString().charAt(charAsNumber.toString().length - 2));
                charAsNumber = unit + tens;
            }
        }
        totalAmountnumber += charAsNumber;
    }
    return totalAmountnumber % 10 === 0;
}


export function isValidAddress(address: string) {
    const addressRegex = /^(\d+\s)?[\w\sàâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ-]+,\s\d{5}\s[\w\sàâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ-]+$/;
    return addressRegex.test(address);
}

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
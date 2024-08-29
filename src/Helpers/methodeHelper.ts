import {Pricing} from "../Interface/Interface.ts";

/**
 * Récupère le dernier segment de l'URL actuelle.
 * @returns Le dernier segment de l'URL.
 */
export function checkUrl(): string {
    const currentUrl = window.location.href;
    const segments = currentUrl.split('/');
    return segments[segments.length - 1];
}

/**
 * Vérifie si le nombre de puzzles créés est inférieur au nombre de tests à créer spécifié dans la dernière commande de tarification.
 * @param nbPuzzleCreated Le nombre de puzzles déjà créés.
 * @param lastCommande La dernière commande de tarification contenant le nombre de tests à créer.
 * @returns Vrai si le nombre de puzzles créés est inférieur au nombre de tests à créer, sinon faux.
 */
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

/**
 * Définit un cookie dans le navigateur avec le nom, la valeur et la durée spécifiés.
 * @param name Le nom du cookie.
 * @param value La valeur à assigner au cookie.
 * @param days Le nombre de jours après lesquels le cookie expirera.
 */
export function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Récupère la valeur d'un cookie spécifié par son nom.
 * @param name Le nom du cookie à récupérer.
 * @returns La valeur du cookie s'il existe, sinon null.
 */
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

/**
 * Vérifie si une adresse donnée correspond au format spécifié.
 * Le format spécifié inclut le numéro, le nom de rue, le code postal et la ville.
 * @param address L'adresse à vérifier.
 * @returns Vrai si l'adresse correspond au format spécifié, sinon faux.
 */
export function isValidAddress(address: string) {
    const addressRegex = /^(\d+\s)?[\w\sàâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ-]+,\s\d{5}\s[\w\sàâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ-]+$/;
    return addressRegex.test(address);
}

/**
 * Télécharge un fichier PDF à partir de la réponse HTTP fournie.
 * @param response La réponse HTTP contenant le fichier PDF à télécharger.
 * @param name
 * @returns Vrai si le téléchargement a réussi, sinon faux.
 */
export async function downloadPdf(response: Response, name: string) {
    if (response.status === 200 || response.status === 201) {
        const result = await response.blob();
        const url = window.URL.createObjectURL(new Blob([result]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
    } else {
        return false;
    }
}

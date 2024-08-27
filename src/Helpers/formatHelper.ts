import {TFunction} from "i18next";
import {CommandeEntreprise} from "../Interface/Interface.ts";

/**
 * Format a date to a string
 * @param dateString date to format
 * @param t translation function
 */
export function formatDate(dateString: Date | undefined | string, t: TFunction<"translation", undefined>): string {
    if (!dateString) return '';

    const date: Date = new Date(dateString);

    const optionsDate: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    const optionsHour: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };

    return `${t("the")} ${date.toLocaleDateString("fr", optionsDate)} ${t("at")} ${date.toLocaleTimeString("fr", optionsHour)}`;
}

export function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute(s) et ${remainingSeconds} seconde(s)`;
}

export function formatItemCommande(array: CommandeEntreprise[]) {
    function colorCommande(etat: string) {
        if (!etat) return '';
        else if (etat === 'Cancel') return 'bg-error text-tertiari';
        else if (etat === 'paid') return 'bg-olive-green text-tertiari';
        else if (etat === 'Unsubscribed') return 'bg-golden-yellow text-primary';
        else return 'text-red-500';
    }

    for (let i = 0; i < array.length; i++) {
        array[i].colorEtatCommande = colorCommande(array[i].etatCommande);
    }
    return array;
}
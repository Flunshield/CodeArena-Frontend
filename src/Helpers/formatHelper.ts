import {TFunction} from "i18next";
import {CommandeEntreprise} from "../Interface/Interface.ts";
import {PRICING} from "../constantes/constanteEntreprise.ts";

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

    return `${t("the")} ${date.toLocaleDateString(undefined, optionsDate)} ${t("at")} ${date.toLocaleTimeString(undefined, optionsHour)}`;
}

export function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute(s) et ${remainingSeconds} seconde(s)`;
}

export function formatItemCommande(array: CommandeEntreprise[], t: TFunction<"translation", undefined>) {
    function colorCommande(etat: string) {console.log(etat)
        if(!etat) return '';
        else if (etat === 'Cancel') return 'bg-error text-tertiari';
        else if (etat === 'paid') return 'bg-olive-green text-tertiari';
        else if (etat === 'Unsubscribed') return 'bg-golden-yellow text-primary';
        else return 'text-red-500';
    }
    for (let i = 0; i < array.length; i++) {
        array[i].item = PRICING.find((pricing) => pricing.idApi === array[i].item)?.title ?? array[i].item;
        array[i].dateCommande = formatDate(array[i].dateCommande, t);
        array[i].colorEtatCommande = colorCommande(array[i].etatCommande);
        array[i].etatCommande = t(array[i].etatCommande);
    }
    return array;
}
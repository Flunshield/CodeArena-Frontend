import {TFunction} from "i18next";

/**
 * Format a date to a string
 * @param dateString date to format
 * @param t translation function
 */
export function formatDate(dateString: Date | undefined, t: TFunction<"translation", undefined>): string {
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
import {Pricing, PuzzlesEntreprise} from "../Interface/Interface.ts";

export function checkUrl(): string {
    const currentUrl = window.location.href;
    const segments = currentUrl.split('/');
    return segments[segments.length - 1];
}

export function checkNbTestCreated(tabPuzzlesEntreprise: PuzzlesEntreprise[], lastCommande: Pricing): boolean {
    return tabPuzzlesEntreprise.length < parseInt(lastCommande?.nbCreateTest);
}
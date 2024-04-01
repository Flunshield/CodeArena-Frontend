export function checkUrl(): string {
    const currentUrl = window.location.href;
    const segments = currentUrl.split('/');
    return segments[segments.length - 1];
}
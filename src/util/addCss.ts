export function addCss (css: string): void {
    document.styleSheets[0].insertRule(css)
}

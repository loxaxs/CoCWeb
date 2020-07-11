export function trace(...text: unknown[]) {
    if (window && (window as any).gameTrace) console.log(text);
}

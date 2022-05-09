export const warnBeforeClose = (condition: boolean) => {
    window.onbeforeunload = (s) => (condition ? "" : null);
}
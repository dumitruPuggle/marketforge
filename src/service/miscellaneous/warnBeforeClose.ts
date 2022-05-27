export const warnBeforeClose = (condition: boolean = true) => {
    window.onbeforeunload = (s) => (condition ? "" : null);
}
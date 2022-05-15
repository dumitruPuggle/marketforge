export const getTempToken = () => localStorage.getItem('_temptoken')
export const setTempToken = (token: string) => localStorage.setItem('_temptoken', token)
export const resetTempToken = () => localStorage.removeItem('_temptoken')
import axios from 'axios';


const getAuthenticationToken = () => {
    const token = window.localStorage.getItem('auth_token');
    if (token === null) return
    return `Token ${token}`
}

export const hasAuthenticationToken = () => {
    return getAuthenticationToken() !== undefined;
}

export const api = axios.create({
    baseURL: import.meta.env['API_BASE_URL'] || 'http://localhost:8000/api/',
    headers: {
        Authorization: getAuthenticationToken()
    }
})
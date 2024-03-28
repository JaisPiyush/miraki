import axios from 'axios';


const getAuthenticationToken = () => {
    const token = window.localStorage.getItem('auth_token');
    if (token === null) return
    return `Token ${token}`
}

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        Authorization: getAuthenticationToken()
    }
})
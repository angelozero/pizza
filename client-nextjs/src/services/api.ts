import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { singOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

export function setupAPIClient(context = undefined) {
    let cookies = parseCookies(context);

    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response.status === 401) {
            if (typeof window !== undefined) {
                singOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }
        return Promise.reject(error);
    })

    return api;
}


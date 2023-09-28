import { IUser } from '@interfaces/user';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const request = axios.create({
    baseURL: BACKEND_URL,
});

export async function loginUser(user: IUser) {
    return request.post(
        '/login',
        user,
    );
}

export async function registerUser(user: IUser) {
    return request.post(
        '/register',
        user
    );
}


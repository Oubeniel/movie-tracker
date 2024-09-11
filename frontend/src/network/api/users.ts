import { User } from '@/models/user';
import api from '@/network/axiosInstance'


export async function getAuthenticatedUser() {
    const response = await api.get<User>("/users/me");
    return response.data;
}

export async function getUserByUsername(username: string) {
    const response = await api.get<User>("/users/profile/" + username);
    return response.data;
}

interface SignUpValues {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpValues) {
    const response = await api.post<User>("/users/signup", credentials);
    return response.data;
}

interface LoginValues {
    username: string,
    password: string,
}

export async function login(credentials: LoginValues) {
    const response = await api.post<User>("/users/login", credentials);
    return response.data;
}

export async function logOut() {
    await api.post("/users/logout");
}

interface UpdateUserValues {
    username?: string,
    displayName?: string,
    about?: string,
    favoriteMovies?: string[],
}

export async function updateUser(input: UpdateUserValues) {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        if (value !== undefined) { // we strictly check if value is not undefined
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value as string);
            }
        }
    });
    const response = await api.patch<User>("/users/me", input);
    return response.data;
}
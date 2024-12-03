import { RegisterUserData } from "@/interfaces/users";
import { API_URL } from "./api";

export const signIn = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}

export const signUp = async (data: RegisterUserData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return {
        status: res.status,
        message: await res.json()
    };
}
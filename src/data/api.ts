import { APIError } from "@/interfaces/errors";

export const API_URL = import.meta.env.VITE_API_URL

type ApiRequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
    queryParams?: Record<string, string>;
};

export async function apiRequest<T>(
    endpoint: string,
    { method = "GET", headers = {}, body, queryParams }: ApiRequestOptions = {}
): Promise<T> {
    const token = localStorage.getItem("authToken");

    if (queryParams) {
        const queryString = new URLSearchParams(queryParams).toString();
        endpoint = `${endpoint}?${queryString}`;
    }
    
    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(API_URL + endpoint, config);

    if(!response.ok) {
        const error: APIError = await response.json();
        throw error;
    }

    return response.json() as Promise<T>;
}

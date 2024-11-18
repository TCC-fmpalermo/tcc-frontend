export const API_URL = import.meta.env.VITE_API_URL

type ApiClientOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
};

export async function apiClient<T>(
    endpoint: string,
    { method = "GET", headers = {}, body }: ApiClientOptions = {}
): Promise<T> {
    const token = localStorage.getItem("authToken");
    
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

    return response.json() as Promise<T>;
}

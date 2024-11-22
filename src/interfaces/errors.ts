export function isAPIError(error: unknown): error is APIError {
    return typeof error === "object" && error !== null && "message" in error;
}

export interface APIError {
    statusCode: number;
    message: string;
    error: string;
}
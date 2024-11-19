import { apiRequest } from "./api";

export const getPermissions = async (): Promise<string[]> => {
    return apiRequest<string[]>("/permissions");
};
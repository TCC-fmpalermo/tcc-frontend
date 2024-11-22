import { CreateUserData, GetUsersFilters, UserData } from "@/interfaces/users";
import { apiRequest } from "./api";

export const getUsers = async ({ search, role, status }: GetUsersFilters): Promise<UserData[]> => {
    return apiRequest<UserData[]>("/users", { 
        queryParams: { 
            search: search || "", 
            role: role || "", 
            status: status || "" 
        } 
    });
};

export const createUser = async (user: CreateUserData): Promise<UserData> => {
    return apiRequest<UserData>("/users", {
        method: "POST",
        body: user,
    });
}

export const getUserStatusOptions = async (): Promise<string[]> => {
    return apiRequest<string[]>("/users/status/all");
}
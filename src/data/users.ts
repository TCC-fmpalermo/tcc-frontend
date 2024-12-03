import { CreateUserData, GetUsersFilters, GetUserData, UpdateUserData, UpdatePersonalInformation } from "@/interfaces/users";
import { apiRequest } from "./api";

export const getUsers = async ({ search, role, status }: GetUsersFilters): Promise<GetUserData[]> => {
    return apiRequest<GetUserData[]>("/users", { 
        queryParams: { 
            search: search || "", 
            role: role || "", 
            status: status || "" 
        } 
    });
};

export const createUser = async (user: CreateUserData): Promise<GetUserData> => {
    return apiRequest<GetUserData>("/users", {
        method: "POST",
        body: user,
    });
}

export const updateUser = async (id: number, user: UpdateUserData): Promise<GetUserData> => {
    return apiRequest<GetUserData>(`/users/${id}`, {
        method: "PATCH",
        body: user,
    });
}

export const getPersonalInformation = async (): Promise<GetUserData> => {
    return apiRequest<GetUserData>("/users/me");
}

export const updatePersonalInformation = async (user: UpdatePersonalInformation): Promise<GetUserData> => {
    return apiRequest<GetUserData>("/users/me", {
        method: "PATCH",
        body: user,
    })
}

export const getUserStatusOptions = async (): Promise<string[]> => {
    return apiRequest<string[]>("/users/status/all");
}
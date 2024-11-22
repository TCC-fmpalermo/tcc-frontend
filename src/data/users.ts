import { CreateUserData, UserData } from "@/interfaces/users";
import { apiRequest } from "./api";

export const getUsers = async (): Promise<UserData[]> => {
    return apiRequest<UserData[]>("/users");
};

export const createUser = async (user: CreateUserData): Promise<UserData> => {
    return apiRequest<UserData>("/users", {
        method: "POST",
        body: user,
    });
}
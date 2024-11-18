import { UserData } from "@/interfaces/users";
import { apiClient } from "./api";

export const getUsers = async (): Promise<UserData[]> => {
    return apiClient<UserData[]>("/users");
};
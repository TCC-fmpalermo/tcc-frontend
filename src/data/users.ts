import { UserData } from "@/interfaces/users";
import { apiRequest } from "./api";

export const getUsers = async (): Promise<UserData[]> => {
    return apiRequest<UserData[]>("/users");
};
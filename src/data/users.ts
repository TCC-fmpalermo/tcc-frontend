import { UserData } from "@/interfaces/users";
import { API_URL } from "./api";

export const getUsers = async (): Promise<UserData[]> => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
};
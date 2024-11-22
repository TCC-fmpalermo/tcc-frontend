import { RoleData } from "@/interfaces/roles";
import { apiRequest } from "./api";

export const getRoles = async (): Promise<RoleData[]> => {
    return apiRequest<RoleData[]>("/roles");
};
import { GetRoleData } from "@/interfaces/roles";
import { apiRequest } from "./api";

export const getRoles = async (): Promise<GetRoleData[]> => {
    return apiRequest<GetRoleData[]>("/roles");
};
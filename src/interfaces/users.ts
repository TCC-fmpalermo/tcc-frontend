import { GetRoleData } from "./roles";

export interface GetUsersFilters {
    search: string | null;
    role: string | null;
    status: string | null;
}

export interface RegisterUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}
export interface GetUserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: GetRoleData;
    createdAt: string;
    status: string;
}

export interface UpdateUserData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
}

export interface UpdatePersonalInformation {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}
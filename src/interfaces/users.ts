export interface GetUsersFilters {
    search: string | null;
    role: string | null;
    status: string | null;
}

export interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}
export interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    status: string;
}
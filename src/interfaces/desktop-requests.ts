import { GetDesktopOptionData } from "./desktop-options";
import { GetUserData } from "./users";

export interface CreateDesktopRequestData {
    desktopOptionId: number;
    objective: string;
}

export interface GetDesktopRequestData {
    id: number;
    objective: string;
    desktopOption: GetDesktopOptionData;
    user: GetUserData;
    status: string;
    requestedAt: string;
    finishedAt: string | null;
}

export interface GetDesktopRequestFilters {
    status?: string;
}
import { CreateDesktopRequestData, GetDesktopRequestData, GetDesktopRequestFilters } from "@/interfaces/desktop-requests";
import { apiRequest } from "./api";

export const createDesktopRequest = async (data: CreateDesktopRequestData): Promise<GetDesktopRequestData> => {
    return apiRequest<GetDesktopRequestData>("/desktop-requests", {
        method: "POST",
        body: data,
    });
}

export const getDesktopRequests = async ({ status }: GetDesktopRequestFilters): Promise<GetDesktopRequestData[]> => {
    return apiRequest<GetDesktopRequestData[]>("/desktop-requests", { queryParams: { status: status || "" } });
}

export const updateStatusDesktopRequest = async (id: number, status: string): Promise<GetDesktopRequestData> => {
    return apiRequest<GetDesktopRequestData>(`/desktop-requests/${id}/update-status`, {
        method: "PATCH",
        body: { status },
    });
}

export const getUserDesktopRequests = async (): Promise<GetDesktopRequestData[]> => {
    return apiRequest<GetDesktopRequestData[]>("/desktop-requests/mine");
}

export const deleteDesktopRequest = async (id: number): Promise<void> => {
    return apiRequest<void>(`/desktop-requests/${id}`, {
        method: "DELETE",
    });
}
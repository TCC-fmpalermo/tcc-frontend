import { CreateDesktopOptionData, FlavorsSpecs, GetDesktopOptionData, GetDesktopOptionFilters, ImageInfo } from "@/interfaces/desktop-options";
import { apiRequest } from "./api";

export const getDesktopOptions = async ({ status }: GetDesktopOptionFilters): Promise<GetDesktopOptionData[]> => {
    return apiRequest<GetDesktopOptionData[]>("/desktop-options", { queryParams: { status: status || "" } });
}

export const getImageOptions = async (): Promise<ImageInfo[]> => {
    return apiRequest<ImageInfo[]>("/desktop-options/images");
}

export const getFlavorOptions = async (): Promise<FlavorsSpecs[]> => {
    return apiRequest<FlavorsSpecs[]>("/desktop-options/flavors");
}

export const createDesktopOption = async (data: CreateDesktopOptionData): Promise<GetDesktopOptionData> => {
    return apiRequest<GetDesktopOptionData>("/desktop-options", {
        method: "POST",
        body: data,
    });
}

export const updateDesktopOption = async (id: number, data: CreateDesktopOptionData): Promise<GetDesktopOptionData> => {
    return apiRequest<GetDesktopOptionData>(`/desktop-options/${id}`, {
        method: "PATCH",
        body: data,
    });
}

export const getDesktopOptionStatusOptions = async (): Promise<string[]> => { 
    return apiRequest<string[]>("/desktop-options/status/all");
}
import { getDesktopOptionData } from "@/interfaces/desktop-options";
import { apiRequest } from "./api";

export const getDesktopOptions = async (): Promise<getDesktopOptionData[]> => {
    return apiRequest<getDesktopOptionData[]>("/desktop-options");
}
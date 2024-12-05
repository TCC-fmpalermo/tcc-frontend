import { FlavorsSpecs, ImageInfo } from "./desktop-options";

export interface InstanceData {
    id: number;
    name: string;
    ipAddress: string;
    flavorSpecs: FlavorsSpecs;
    cpus: string;
    ram: string;
}

export interface VolumeData {
    id: number;
    size: number;
    imageInfo: ImageInfo;
}

export interface UserData {
    id: number;
    firstName: string;
    lastName: string;
}

export interface GetDesktopsData {
    id: number;
    alias: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastAccessedAt: string | null;
    status: string;
    desktopOption: number;
    instance: InstanceData;
    volume: VolumeData;
    user: UserData
}

export interface GetUserDesktopsData {
    id: number;
    alias: string;
    createdAt: string;
    updatedAt: string;
    lastAccessedAt: string;
    status: string;
    instance: InstanceData;
    volume: VolumeData;
}

export interface GetDesktopAccessTokenData {
    token: string;
}

export interface CreateDesktopData {
    alias: string;
    desktopOptionId: number;
}

export interface UpdateDesktopData {
    alias: string;
}
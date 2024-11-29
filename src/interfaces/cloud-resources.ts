import { ImageInfo } from "./desktop-options";

export interface InstanceData {
    id: number;
    cpus: string;
    ram: string;
}

export interface VolumeData {
    id: number;
    size: number;
    imageInfo: ImageInfo;
}

export interface GetCloudResourcesData {
    id: number;
    alias: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    lastAccessedAt: Date | null;
    status: string;
    user: number;
    desktopOption: number;
    instance: InstanceData;
    volume: VolumeData;
}

export interface GetUserCloudResourcesData {
    id: number;
    alias: string;
    createdAt: string;
    updatedAt: string;
    lastAccessedAt: string;
    status: string;
    instance: InstanceData;
    volume: VolumeData;
}

export interface CreateCloudResourceData {
    alias: string;
    desktopOptionId: number;
}

export interface UpdateCloudResourceData {
    alias: string;
}
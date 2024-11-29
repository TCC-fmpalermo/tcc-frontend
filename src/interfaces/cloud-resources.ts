export interface InstanceData {
    id: number;
    name: string;
    ipAddress: string;
    username: string;
    password: string;
    openstackInstanceId: string;
}

export interface VolumeData {
    id: number;
    operatingSystem: string;
    size: number;
    openstackVolumeId: string;
    openstackImageId: string;
}

export interface getCloudResourcesData {
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

export interface CreateCloudResourceData {
    alias: string;
    desktopOptionId: number;
}
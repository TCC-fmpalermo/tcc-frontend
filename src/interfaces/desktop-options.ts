
export interface FlavorsSpecs {
    id: string,
    name: string,
    vcpus: string,
    ram: string
}

export interface ImageInfo {
    id: string,
    name: string,
    size: string
}
export interface GetDesktopOptionData {
    id: number,
    description: string,
    size: string,
    openstackFlavorId: string,
    openstackImageId: string
    autoApproved: boolean,
    status: string,
    defaultUsername: string,
    flavorSpecs: FlavorsSpecs
    imageInfo: ImageInfo
}

export interface GetDesktopOptionFilters {
    status?: string
}

export interface CreateDesktopOptionData {
    description?: string,
    size: number,
    openstackFlavorId: string,
    openstackImageId: string,
    autoApproved: boolean,
    defaultUsername: string
}
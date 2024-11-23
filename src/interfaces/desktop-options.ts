
interface FlavorsSpecs {
    id: string,
    name: string,
    vcpus: string,
    ram: string
}
export interface getDesktopOptionData {
    id: number,
    operatingSystem: string,
    description: string,
    size: string,
    openstackFlavorId: string,
    openstackImageId: string
    autoApproved: boolean,
    status: string,
    flavorSpecs: FlavorsSpecs
}
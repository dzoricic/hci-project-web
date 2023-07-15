export enum TableArea {
    STAGE = "Stage",
    VIP = "Vip",
    BAR = "Bar",
    ALL = "All"
}

export enum EntrancePass {
    REGULAR = "Regular",
    VIP = "VIP",
    VIP_PLUS = "VIP+"
}

export enum Page {
    DRINK_OFFER,
    PHOTO_GALLERY,
    EVENTS,
    HOME
}

export const AreaLabels = new Map([
    [TableArea.BAR, "Bar Area"],
    [TableArea.STAGE, "Stage Area"],
    [TableArea.VIP, "VIP Area"]
])

export const PassLabels = new Map([
    [EntrancePass.REGULAR, "Regular"],
    [EntrancePass.VIP, "VIP"],
    [EntrancePass.VIP_PLUS, "VIP+"]
])
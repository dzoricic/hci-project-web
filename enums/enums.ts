export enum TableArea {
    STAGE,
    VIP,
    BAR,
}

export enum EntrancePass {
    REGULAR,
    VIP,
    VIP_PLUS
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
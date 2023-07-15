import { EntrancePass, TableArea } from "enums";
import { Area } from "typings";

export const areaData: Area[] = [
    {
        id: "63cd0f5e932d28cbab6c67d5",
        type: TableArea.STAGE,
        minimumPrice: 80,
        minimumGuests: 4,
        arrivalTime: "22:00",
        entrancePass: EntrancePass.REGULAR,
        tables: [
            {
                id: "63cd1411b2035c8e84fc35d4",
                name: "SA1",
                price: 200
            },
            {
                id: "63cd14114ad34d82c8a3c6a4",
                name: "SA2",
                price: 200
            },
            {
                id: "63cd14116b966efc04354d31",
                name: "SA3",
                price: 120
            },
            {
                id: "63cd1411d6614471d50a003a",
                name: "SA4",
                price: 120
            },
            {
                id: "63cd1411c827e60138ea11c2",
                name: "SA5",
                price: 120
            },
            {
                id: "63cd1411c1493417b7bd3d3a",
                name: "SA6",
                price: 80
            },
            {
                id: "63cd141156342393109ac17b",
                name: "SA7",
                price: 120
            },
            {
                id: "63cd1411422c2a365e45fe72",
                name: "SA8",
                price: 80
            },
            {
                id: "63cd1411f1f321e6e6f29809",
                name: "SA9",
                price: 120
            },
            {
                id: "63cd141190f8b622608195a1",
                name: "SA10",
                price: 80
            },
            {
                id: "63cd1411a75330ef6db06e3f",
                name: "SA11",
                price: 200
            },
            {
                id: "63cd1411f2a82810da7c7dcf",
                name: "SA12",
                price: 200
            }
        ]
    },
    {
        id: "63cd0f5e8669f4c7229395b7",
        type: TableArea.BAR,
        minimumPrice: 120,
        minimumGuests: 3,
        arrivalTime: "22:00",
        entrancePass: EntrancePass.REGULAR,
        tables: [
            {
                id: "63cd14119a521b6827bc66e4",
                name: "BA1",
                price: 300
            },
            {
                id: "63cd1411f086701ac18ab32b",
                name: "BA2",
                price: 300
            },
            {
                id: "63cd1411a18599888e1e18f2",
                name: "BB1",
                price: 150
            },
            {
                id: "63cd141107656221a68f8503",
                name: "BB2",
                price: 150
            },
            {
                id: "63cd14119cd569cb05a6b9f6",
                name: "BC1",
                price: 120
            },
            {
                id: "63cd1411950b02d9bf7d3c81",
                name: "BC2",
                price: 120
            }
        ]
    },
    {
        id: "63cd0f5e9ff34ca125767e42",
        type: TableArea.VIP,
        minimumPrice: 300,
        minimumGuests: 5,
        arrivalTime: "23:00",
        entrancePass: EntrancePass.VIP,
        tables: [
            {
                id: "63cd14116a5a4368a7a345bf",
                name: "VA1",
                price: 300
            },
            {
                id: "63cd1411b9f5b4452227e4eb",
                name: "VA2",
                price: 400
            },
            {
                id: "63cd14116a5a4368a7a345ef",
                name: "VA3",
                price: 400
            },
            {
                id: "63cd1411b9f5b4452227e4ac",
                name: "VA4",
                price: 500
            }
        ]
    },
]
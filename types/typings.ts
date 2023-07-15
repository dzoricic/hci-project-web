import { EntrancePass, TableArea } from "enums/enums";

export interface FooterItem {
    imageSource: string;
    text: string;
}

export interface HeaderItem {
    label: string;
    url: string;
}

export interface DefaultContainerItem {
    title: string;
    text: string;
    imageSource: string;
    buttonText?: string;
    navigationLink?: string;
}

export interface HomeTitleProps {
    title: string;
    text: string;
}

export interface GalleryImage {
    id: string;
    imageSource: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    totalVisits: number;
    totalSpent: number;
    balance: number;
    email: string;
    phone: string;
    imageUrl?: string;
    events?: EventData[];
}

export interface EventData {
    id: string;
    name: string;
    date?: string;
    imageSource?: string;
}

export interface Area {
    id: string;
    type: TableArea;
    minimumPrice: number;
    minimumGuests: number;
    arrivalTime: string;
    entrancePass: EntrancePass;
    tables: Table[];
}

export interface Table {
    id: string;
    name: string;
    price: number;
}

export interface Drink {
    id: number;
    name: string;
    price: string;
    description: string;
}

export interface Category {
    id: string;
    name: string;
    drinks: Drink[];
    imageSource: string;
}

export interface DrinkResponse {
    categories: Category[];
}

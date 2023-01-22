import { EntrancePass, TableArea } from "enums/enums";

export interface FooterItem {
    imageSource: string;
    text: string;
}

export interface HeaderItem {
    label: string;
    url: string;
}

export interface HomeItem {
    title: string;
    text: string;
    imageSource: string;
    buttonText?: string;
    navigationLink?: string;
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
    events?: Event[];
}

export interface Event {
    id: string;
    name: string;
    date: string;
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
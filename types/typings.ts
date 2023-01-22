export interface FooterItem {
    imageSource: string;
    text: string;
}

export interface HeaderItems {
    label: string;
    url: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    totalVisits: number;
    totalSpent: number;
    balance: number;
    imageUrl?: string;
}
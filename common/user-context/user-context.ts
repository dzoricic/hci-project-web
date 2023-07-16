import { createContext } from "react";
import { User } from "typings";

export type UserContextReturn = {
    user?: User;
    login: (username?: string | null, password?: string | null) => void;
    logout: () => void;
    updateUser: (newUser?: User) => void;
    register: (firstname?: string | null, lastName?: string | null, email?: string | null, password?: string | null) => void;
}

export const UserContext = createContext<UserContextReturn | undefined>(undefined);
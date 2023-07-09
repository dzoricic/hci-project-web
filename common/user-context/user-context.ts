import { createContext } from "react";
import { User } from "typings";

export type UserContextReturn = {
    user?: User;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextReturn | undefined>(undefined);
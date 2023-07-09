import { useContext } from "react";
import { UserContext, UserContextReturn } from "./user-context";

export const useUserContext = (): UserContextReturn => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User context must be defined");
    }

    return context;
}
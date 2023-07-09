import { PropsWithChildren, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { User } from "typings";
import { userData } from "fake-data";
import { toast } from "react-toastify";

interface Props {
    userId?: string;
}

export const UserContextProvider = ({ userId, children }: PropsWithChildren<Props>) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    useEffect(() => {
        const user: User | undefined = userData.find((u) => u.id === userId);
        if (user) {
            setUser(user);
        }
    }, [userId]);

    const loginUser = (email: string, password: string) => {
        const user: User | undefined = userData.find((u) => u.email === email);
        if (!user) {
            toast.error("User not found!", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
        setUser(user);
    }

    const logOut = () => {
        setUser(undefined);
    }

    return (
        <UserContext.Provider value={{ user, login: loginUser, logout: logOut }}>
            { children }
        </UserContext.Provider>
    )
}
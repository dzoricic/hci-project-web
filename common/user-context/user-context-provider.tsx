import { PropsWithChildren, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { User } from "typings";
import { userData } from "fake-data";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            const user: User | undefined = userData.find((u) => u.id === userId);
            if (user) {
                setUser(user);
            }
        }
    }, []);

    const loginUser = (username?: string | null, password?: string | null) => {
        const user: User | undefined = userData.find((u) => u.userName === username);
        if (!user) {
            toast.error("User not found!", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            return;
        }
        if (!!password) {
            localStorage.setItem("userId", user.id);
            setUser(user);
            router.push("/home");
            return;
        }
        toast.error("Please provide a password!", {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    const logOut = () => {
        setUser(undefined);
        localStorage.removeItem("userId");
        toast.info("Logged out!", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        router.push("/home");
    }

    const updateUser = (newUser?: User) => {
        if (!newUser || !user) {
            return;
        }
        if (newUser.id !== user.id) {
            toast.error("Cannot update other profiles.", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            return;
        }
        const index = userData.findIndex((item) => item.id === user.id);
        if (index !== -1) {
            userData.splice(index, 1);
        }
        userData.push(newUser);
        localStorage.setItem("userId", user.id);
        setUser(newUser);

        toast.success("Profile saved.", {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    const register = (firstName?: string | null, lastName?: string | null, email?: string | null, password?: string | null) => {
        if (!firstName || !lastName || !email || !password) {
            toast.error("Please fill out all fields.", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            return;
        }
        const newUser: User = {
            id: Math.floor(Math.random() * 100000).toString(),
            firstName: firstName,
            lastName: lastName,
            userName: firstName[0]+lastName,
            totalVisits: 0,
            totalSpent: 0,
            balance: 0,
            email: email,
            phone: ''
        }
        userData.push(newUser);
        setUser(newUser);
        router.push("/home");
    }

    return (
        <UserContext.Provider value={{ user, login: loginUser, logout: logOut, updateUser, register }}>
            { children }
        </UserContext.Provider>
    )
}
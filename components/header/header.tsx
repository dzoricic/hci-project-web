import { useRouter } from "next/router";

import styles from "./header.module.scss";
import dropdownStyles from "./dropdown.module.scss";
import { User } from "typings";
import { headerItems } from "utils";

import { default_picture, moon_logo } from "icons";
import React, { useState } from "react";
import { NavbarButton } from "components/button/navbar-button";
import { SecondaryButton } from "components/button/secondary-button";
import { useUserContext } from "common/user-context/use-user-context";

interface Props {
    user?: User;
}

const Header = (props: Props) => {
    const { user, logout } = useUserContext();
    const router = useRouter();

    const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
    const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

    const renderUserDropdown = (profile_picture: string, userId: string): JSX.Element => (
        <div
            className={dropdownStyles.dropdown}
            onMouseEnter={() => setOpenUserMenu(true)}
            onMouseLeave={() => setOpenUserMenu(false)}
        >
            <img src={profile_picture} className={styles.profile_picture}/>
            {openUserMenu && (
                <div className={dropdownStyles.dropdownMenuRight}>
                    <ul>
                        <li onClick={() => router.push(`/user-profile/${userId}`)}>Profile</li>
                        <li onClick={logout}>Log out</li>
                    </ul>
                </div>
            )}
        </div>
    );

    const renderMobileMenuDropdown = (): JSX.Element => (
        <div
            className={dropdownStyles.dropdown}
            onClick={() => setOpenMobileMenu((value => !value))}
            onMouseLeave={() => setOpenMobileMenu(false)}
        >
            <img src="static/icons/menu.png" width="30px"/>
            {openMobileMenu && (
                <div className={dropdownStyles.dropdownMenuLeft}>
                    <ul>
                        {resolveMobileNavbarLinks()}
                    </ul>
                </div>
            )}
        </div>
    );

    const renderBalance = () => {
        if (!user) {
            return;
        }
        return (
            <>
                <span className={styles.balanceKey}>Balance</span>
                <span className={styles.balanceValue}>${user.balance}.00</span>
            </>
        )
    }

    const renderNavbarUser = (): JSX.Element | undefined => {
        if (!user) {
            return;
        }
        const profile_picture = user?.imageUrl ?? default_picture.src;
        return renderUserDropdown(profile_picture, user.id);
    }

    const renderLoginButton = (): JSX.Element | undefined => {
        if (user) {
            return;
        }
        return <SecondaryButton text="Log in" onClick={() => router.push("/login")}/>
    }

    const resolveNavbarLinks = (): JSX.Element[] => {
        return headerItems.map((item) => {
            const isActive = router.pathname.includes(item.url);
            return <NavbarButton key={ item.label } isActive={isActive} onClick={() => router.push(item.url)} text={item.label}/>
        })
    }

    const resolveMobileNavbarLinks = (): JSX.Element[] => {
        return headerItems.map((item) => {
            return <li key={ item.label } onClick={() => router.push(item.url)}>{item.label}</li>
        })
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.mobilePages}>
                { renderMobileMenuDropdown() }
            </div>
    	    <img src={moon_logo.src} className={styles.headerLogo} onClick={() => router.push("/home")}/>
            <div className={styles.pages}>
                { resolveNavbarLinks() }
            </div>
            <div className={styles.userContainer}>
                { renderBalance() }
                { renderLoginButton() }
                { renderNavbarUser() }
            </div>
        </div>
    )
}

export default Header;
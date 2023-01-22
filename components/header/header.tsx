import { Navbar, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

import styles from "styles/header.module.scss";
import { User } from "typings";
import { headerItems } from "utils";

import { default_picture, moon_logo } from "icons";

interface Props {
    user?: User;
}

const Header = ({ user }: Props) => {
    const router = useRouter();

    const resolveNavbarLinks = () => {
        return headerItems.map((item) => {
            const isActive = router.pathname.includes(item.url);
            return <Navbar.Link isActive={isActive} onClick={() => router.push(item.url)}>{item.label}</Navbar.Link>
        })
    }

    const resolveNavbarLogin = () => {
        if (user) {
            const profile_picture = user.imageUrl ?? default_picture.src;
            return (
                <>
                    <Navbar.Item>
                        <Button auto flat onClick={() => router.push("/reservation")} className={styles.reservation_button} css={{color: "White", backgroundColor: '$primary', borderRadius: '0.5em'}}>
                            Make a reservation
                        </Button>
                    </Navbar.Item>
                    <Navbar.Item>
                        <img src={profile_picture} className={styles.profile_picture} onClick={() => router.push(`/user-profile/${user.id}`)}/>
                    </Navbar.Item>
                </>
            )
        }

        return (
            <Navbar.Item>
                <Button auto flat onClick={() => router.push("/login")} className={styles.login_button} css={{color: "Black", backgroundColor: '$secondary', borderRadius: '0.5em'}}>
                    Log in
                </Button>
            </Navbar.Item>
        )
    }

    return (
        <Navbar variant="sticky" className={styles.background}>
            <Navbar.Brand>
                <img src={moon_logo.src} width="100px" onClick={() => router.push("/home")} style={{cursor: "pointer"}}/>
            </Navbar.Brand>
            <Navbar.Content activeColor={"primary"} hideIn="xs" variant={"underline"}>
                {resolveNavbarLinks()}
            </Navbar.Content>
            <Navbar.Content>
                {resolveNavbarLogin()}
            </Navbar.Content>
        </Navbar>
    )
}

export default Header;
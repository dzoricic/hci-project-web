import { Button, Grid, Input, Text } from "@nextui-org/react";
import { PageWrapper } from "components";
import { userData } from "fake-data";
import { useRouter } from "next/router";
import React from "react";
import { EventData, User } from "typings";
import styles from "./user.module.scss";
import { toast } from "react-toastify";
import { useUserContext } from "common/user-context/use-user-context";
import { SecondaryButton } from "components/button/secondary-button";
import { galleryList } from "utils";
import { default_picture } from "icons";
import { PrimaryButton } from "components/button/primary-button";

const UserProfile = () => {
    const router = useRouter();

    const { user: myUser, updateUser } = useUserContext();

    const [edit, setEdit] = React.useState<boolean>(false);
    const [user, setUserProfile] = React.useState<User>();
    const [username, setUsername] = React.useState<string | null>();
    const [password, setPassword] = React.useState<string | null>();
    const [name, setName] = React.useState<string>();
    const [lastname, setLastname] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();
    const [phone, setPhone] = React.useState<string>();
    const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

    const pictures = galleryList;

    function onMount() {
        const { userId } = router.query;
        const profileUser = userData.find((us) => us.id === userId);
        if (profileUser) {
            setUserProfile(profileUser);
            setUsername(profileUser.userName);
            setName(profileUser.firstName);
            setLastname(profileUser.lastName);
            setEmail(profileUser.email);
            setPhone(profileUser.phone);
        }
    }

    React.useEffect(onMount, []);
    // React.useEffect(onMount, [router])

    React.useEffect(function didUpdate() {
        validateChangeButton();
    }, [username, password, name, lastname, email, phone])

    const listEvents = () => {
        if (!user?.events?.length) {
            return (
                <div className={styles.noEvents}>
                    <span>You have not gone to any event!</span>
                    <PrimaryButton text="Make a reservation" onClick={() => router.push("/events")}/>
                </div>
            )
        }
        return user?.events?.map((event) => renderPastEvents(event))
    }

    const renderPastEvents = (event: EventData) => {
        return (
            <div className={styles.pastEvents} onClick={() => router.push(`/gallery/${event.id}`)}>
                <img className={styles.pastEventPhoto} src={event.imageSource}/>
                <div className={styles.pastEventData}>
                    <span className={styles.totalValue}>{ event.name }</span>
                    <span className={styles.totalKey}>{ event.date }</span>
                </div>
            </div>
        )
    }

    const validateChangeButton = () => {
        if (
            user?.firstName !== name ||
            user?.lastName !== lastname ||
            user?.userName !== username ||
            user?.phone !== phone ||
            user?.email !== email ||
            !!password
        ) {
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
    }

    const saveChanges = () => {
        if (!user) {
            toast.warning("Could not save changes", {
                position: toast.POSITION.BOTTOM_LEFT
            })
            return;
        }
        const newUser: User = {
            id: user.id,
            firstName: name ?? user.firstName,
            lastName: lastname ?? user.lastName,
            userName: username ?? user.userName,
            email: email ?? user.email,
            events: user.events,
            phone: phone ?? user.phone,
            totalSpent: user.totalSpent,
            totalVisits: user.totalVisits,
            balance: user.balance,
            imageUrl: user.imageUrl
        }
        updateUser(newUser);
        setUserProfile(newUser);
        setEdit(false);
    }

    const renderUserProfile = () => {
        if (edit) {
            return (
                <div className={styles.profileDataForm}>
                    <div className={styles.profileDataRow}>
                        <Input
                            labelRight="Name"
                            value={name ?? undefined}
                            fullWidth
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className={styles.profileDataRow}>
                        <Input
                            labelRight="Lastname"
                            value={lastname ?? undefined}
                            fullWidth
                            onChange={(event) => setLastname(event.target.value)}
                        />
                    </div>
                    <div className={styles.profileDataRow}>
                        <Input
                            labelRight="Username"
                            value={username ?? undefined}
                            fullWidth
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className={styles.profileDataRow}>
                        <Input
                            labelRight="Email"
                            value={email ?? undefined}
                            fullWidth
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className={styles.profileDataRow}>
                        <Input
                            labelRight="Phone"
                            type={!user?.phone ? "number" : undefined}
                            value={phone ?? undefined}
                            fullWidth
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div className={styles.profileDataRow}>
                        <Input
                            labelRight="Password"
                            type="password"
                            value={password ?? undefined}
                            fullWidth
                            css={{ color: "black" }}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className={styles.saveButtonContainer}>
                        <SecondaryButton text="Save changes" onClick={saveChanges} disabled={isDisabled}/>
                    </div>
                </div>
            )
        }

        return (
            <div className={styles.profileDataContainer}>
                <div className={styles.profileDataRow}>
                    <span className={styles.infoKey}>Name:</span>
                    <span className={styles.infoValue}>{user?.firstName}</span>
                </div>
                <div className={styles.profileDataRow}>
                    <span className={styles.infoKey}>Lastname:</span>
                    <span className={styles.infoValue}>{user?.lastName}</span>
                </div>
                <div className={styles.profileDataRow}>
                    <span className={styles.infoKey}>Username:</span>
                    <span className={styles.infoValue}>{user?.userName}</span>
                </div>
                <div className={styles.profileDataRow}>
                    <span className={styles.infoKey}>Email:</span>
                    <span className={styles.infoValue}>{user?.email}</span>
                </div>
                <div className={styles.profileDataRow}>
                    <span className={styles.infoKey}>Phone:</span>
                    <span className={styles.infoValue}>{user?.phone}</span>
                </div>
            </div>
        )
    }

    const toggleEdit = () => {
        if (user?.id === myUser?.id) {
            setEdit(!edit);
        }
    }

    const resolveToggleButton = () => {
        if (user?.id === myUser?.id) {
            return <SecondaryButton text="Toggle edit" onClick={toggleEdit}/>
        }
    }

    const renderPhotos = () => {
        if (!pictures) {
            return <span>No photos found</span>
        }
        if (!user?.events?.length) {
            return <span style={{ textAlign: "center" }}>Go to event to see photos on your profile!</span>
        }
        return pictures.map((picture, index) => <img key={index} className={styles.galleryImage} src={picture.imageSource}/>)
    }

    if (!user) {
        return (
            <PageWrapper>
                <Grid.Container justify="center" css={{ padding: "5em" }}>
                    <Text h1>Could not find user data</Text>
                </Grid.Container>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <main>
                <div className={styles.header}>
                    <div className={styles.basicInfo}>
                        <img className={styles.profilePhoto} src={user?.imageUrl ?? default_picture.src}/>
                        <span className={styles.usernameText}>{user?.firstName} {user?.lastName}</span>
                    </div>
                    <div className={styles.totalContainer}>
                        <div className={styles.totalData}>
                            <span className={styles.totalValue}>{ user?.totalVisits }</span>
                            <span className={styles.totalKey}>Total visits</span>
                        </div>
                        <div className={styles.totalData}>
                            <span className={styles.totalValue}>${ user?.totalSpent }.00</span>
                            <span className={styles.totalKey}>Total spent</span>
                        </div>
                    </div>
                    <div className={styles.balance}>
                        <span className={styles.totalKey}>Balance</span>
                        <span className={styles.totalValue}>${ user?.balance }.00</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.sectionMain}>
                        <div className={styles.sectionContainer2}>
                            <div className={styles.section}>
                                <div className={styles.profileSectionTitle}>
                                    <span className={styles.title}>Profile</span>
                                    {resolveToggleButton()}
                                </div>
                                {renderUserProfile()}
                            </div>
                        </div>
                        <div className={styles.sectionContainer2}>
                            <div className={styles.section}>
                                <div className={styles.profileSectionTitle}>
                                    <span className={styles.title}>Pictures from your events</span>
                                    {user?.events?.length && <SecondaryButton text="More pictures" onClick={() => router.push("/gallery")}/>}
                                </div>
                                <div className={styles.gallery}>
                                    {renderPhotos()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionContainer}>
                        <div className={styles.section}>
                            <div className={styles.profileSectionTitle}>
                                <span className={styles.title}>Past Events</span>
                            </div>
                            <div className={styles.pastEventList}>
                                {listEvents()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PageWrapper>
    )
}

export default UserProfile;
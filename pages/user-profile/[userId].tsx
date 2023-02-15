import { Button, Grid, Input, Text } from "@nextui-org/react";
import { PageWrapper } from "components";
import { userData } from "fake-data";
import { useRouter } from "next/router";
import React from "react";
import { EventData, User } from "typings";
import styles from "styles/home-page.module.scss";
import { useSnackbar } from "react-simple-snackbar";

const UserProfile = () => {
    const router = useRouter();
    const [openSuccessSnackbar] = useSnackbar({
        style: {
            backgroundColor: "green"
        }
    });
    const [openErrorSnackbar] = useSnackbar({
        style: {
            backgroundColor: "red"
        }
    });
    const [loggedInId, setLoggedInId] = React.useState<string>();

    const [user, setUser] = React.useState<User | undefined>();
    const [edit, setEdit] = React.useState<boolean>(false);
    const [username, setUsername] = React.useState<string | null>();
    const [password, setPassword] = React.useState<string | null>();
    const [name, setName] = React.useState<string>();
    const [lastname, setLastname] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();
    const [phone, setPhone] = React.useState<string>();
    const [isDisabled, setIsDisabled] = React.useState<boolean>();

    function onMount() {
        const { userId } = router.query;
        const profileUser = userData.find((us) => us.id === userId);
        if (profileUser) {
            setUser(profileUser);
            setUsername(profileUser.userName);
            setName(profileUser.firstName);
            setLastname(profileUser.lastName);
            setEmail(profileUser.email);
            setPhone(profileUser.phone);
        }
        const loggedInUserId = localStorage.getItem('user_id');
        if (loggedInUserId) {
            setLoggedInId(loggedInUserId)
        }
    }

    React.useEffect(onMount, []);
    React.useEffect(onMount, [router])

    React.useEffect(function didUpdate() {
        validateChangeButton();
    }, [username, password, name, lastname, email, phone])

    const listEvents = () => {
        return user?.events?.map((event) => renderPastEvents(event))
    }

    const renderPastEvents = (event: EventData) => {
        return (
            <Grid.Container alignItems="center" css={{ margin: "1em 0" }}>
                <Grid.Container xs={4}>
                    <img src={event.imageSource}/>
                </Grid.Container>
                <Grid.Container xs={8} direction="column" justify="center" alignItems="flex-start" css={{ padding: "2em" }}>
                    <Text h3>{event.name}</Text>
                    <Text h4 css={{ color: "gray" }}>{event.date}</Text>
                </Grid.Container>
            </Grid.Container>
        )
    }

    const validateChangeButton = () => {
        if (
            user?.firstName !== name ||
            user?.lastName !== lastname ||
            user?.userName !== username ||
            user?.phone !== phone ||
            user?.email !== email ||
            password ||
            password !== ''
        ) {
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
    }

    const saveChanges = () => {
        if (!user) {
            openErrorSnackbar("Could not save changes!");
            return;
        }
        const newUser: User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            events: user.events,
            phone: user.phone,
            totalSpent: user.totalSpent,
            totalVisits: user.totalVisits,
            balance: user.balance,
            imageUrl: user.imageUrl
        }
        setUser(newUser);
        openSuccessSnackbar("Lets pretend the changes are saved!");
    }

    const renderUserProfile = () => {
        if (edit) {
            return (
                <Grid.Container direction="column" justify="flex-start" alignItems="flex-start">
                    <Grid.Container>
                        <Input
                            underlined
                            labelPlaceholder="Name"
                            value={name ?? undefined}
                            fullWidth
                            css={{ marginBottom: "2em" }}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid.Container>
                    <Grid.Container>
                        <Input
                            underlined
                            labelPlaceholder="Lastname"
                            value={lastname ?? undefined}
                            fullWidth
                            css={{ marginBottom: "2em" }}
                            onChange={(event) => setLastname(event.target.value)}
                        />
                    </Grid.Container>
                    <Grid.Container>
                        <Input
                            underlined
                            labelPlaceholder="Username"
                            value={username ?? undefined}
                            fullWidth
                            css={{ marginBottom: "2em" }}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Grid.Container>
                    <Grid.Container>
                        <Input
                            underlined
                            labelPlaceholder="Email"
                            value={email ?? undefined}
                            fullWidth
                            css={{ marginBottom: "2em" }}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid.Container>
                    <Grid.Container>
                        <Input
                            underlined
                            labelPlaceholder="Phone"
                            value={phone ?? undefined}
                            fullWidth
                            css={{ marginBottom: "2em" }}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </Grid.Container>
                    <Grid.Container>
                        <Input
                            underlined
                            type="password"
                            labelPlaceholder="New password"
                            value={password ?? undefined}
                            fullWidth
                            css={{ marginBottom: "2em" }}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Grid.Container>
                    <Grid.Container justify="flex-end">
                        <Button auto disabled={isDisabled} onClick={saveChanges} className={ styles.homeContainerButton } css={{color: 'Black', backgroundColor: '$secondary'}}>
                            Save changes
                        </Button>
                    </Grid.Container>
                </Grid.Container>
            )
        }

        return (
            <Grid.Container direction="column" justify="flex-start" alignItems="flex-start">
                <Grid.Container>
                    <Text h3 css={{ color: "gray", marginRight: "1em" }}>Name:</Text>
                    <Text h3>{user?.firstName}</Text>
                </Grid.Container>
                <Grid.Container>
                    <Text h3 css={{ color: "gray", marginRight: "1em" }}>Lastname:</Text>
                    <Text h3>{user?.lastName}</Text>
                </Grid.Container>
                <Grid.Container>
                    <Text h3 css={{ color: "gray", marginRight: "1em" }}>Username:</Text>
                    <Text h3>{user?.userName}</Text>
                </Grid.Container>
                <Grid.Container>
                    <Text h3 css={{ color: "gray", marginRight: "1em" }}>Email:</Text>
                    <Text h3>{user?.email}</Text>
                </Grid.Container>
                <Grid.Container>
                    <Text h3 css={{ color: "gray", marginRight: "1em" }}>Phone:</Text>
                    <Text h3>{user?.phone}</Text>
                </Grid.Container>
            </Grid.Container>
        )
    }

    const toggleEdit = () => {
        if (user?.id === loggedInId) {
            setEdit(!edit);
        }
    }

    const resolveToggleButton = () => {
        if (user?.id === loggedInId) {
            return (
                <Button auto onClick={toggleEdit} className={ styles.homeContainerButton } css={{color: 'Black', backgroundColor: '$secondary'}}>
                    Toggle edit
                </Button>
            )
        }
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
                <Grid.Container justify="space-between" alignItems="center" css={{ backgroundColor: "$background_secondary" }}>
                    <Grid.Container xs={4} alignItems="center">
                        <img src={user?.imageUrl} width="100px" style={{ borderRadius: "100px", margin: "3em" }}/>
                        <Text h2>{user?.firstName} {user?.lastName}</Text>
                    </Grid.Container>
                    <Grid.Container xs={3}>
                        <Grid.Container xs={4} direction="column" alignItems="center">
                            <Text h3>{user?.totalVisits}</Text>
                            <Text h3 css={{ color: "gray", fontWeight: 600 }}>Total visits</Text>
                        </Grid.Container>
                        <Grid.Container xs={4} direction="column" alignItems="center">
                            <Text h3>{user?.totalSpent} €</Text>
                            <Text h3 css={{ color: "gray", fontWeight: 600 }}>Total spent</Text>
                        </Grid.Container>
                    </Grid.Container>
                        <Grid.Container xs={2} alignItems="center">
                            <Text h3 css={{ color: "gray", fontWeight: 600, marginRight: "2em" }}>Balance</Text>
                            <Text h3>{user?.balance} €</Text>
                        </Grid.Container>
                </Grid.Container>
                <Grid.Container>
                    <Grid.Container direction="column" xs={4} css={{ padding: "2em" }}>
                        <Grid.Container css={{ padding:"2em", backgroundColor: "$background_secondary" }}>
                            <Grid.Container justify="space-between" alignItems="center" css={{ marginBottom: "2em" }}>
                                <Text h2>Profile</Text>
                                {resolveToggleButton()}
                            </Grid.Container>
                            {renderUserProfile()}
                        </Grid.Container>
                    </Grid.Container>
                    <Grid.Container xs={4} css={{ padding: "2em 0" }}>
                    </Grid.Container>
                    <Grid.Container xs={4} css={{ padding: "2em" }}>
                        <Grid.Container css={{ padding:"2em", backgroundColor: "$background_secondary" }}>
                            <Grid.Container>
                                <Text h2>Past Events</Text>
                            </Grid.Container>
                            {listEvents()}
                        </Grid.Container>
                    </Grid.Container>
                </Grid.Container>
            </main>
        </PageWrapper>
    )
}

export default UserProfile;
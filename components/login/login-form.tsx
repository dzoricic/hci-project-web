import { Button, Grid, Input, Text } from "@nextui-org/react";
import { userData } from "fake-data";
import { facebook, google } from "icons";
import { useRouter } from "next/router";
import React from "react";
import styles from "styles/home-page.module.scss";
import { toast } from "react-toastify";

interface Props {
    isLogin?: boolean;
}

const LoginForm = ({ isLogin }: Props) => {
    const [username, setUsername] = React.useState<string | null>();
    const [password, setPassword] = React.useState<string | null>();
    const [name, setName] = React.useState<string>();
    const [lastname, setLastname] = React.useState<string>();

    const router = useRouter();

    React.useEffect(function onMount() {
        if (isLogin) {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        } else {
            setUsername(localStorage.getItem('username'));
            setPassword(localStorage.getItem('password'));
        }
    })

    const handleUsername = (value: string) => {
        setUsername(value);
    }

    const handlePassword = (value: string) => {
        setPassword(value);
    }

    const handleName = (value: string) => {
        setName(value);
    }

    const handleLastname = (value: string) => {
        setLastname(value);
    }

    const onRegister = () => {
        localStorage.setItem('username', username ?? '');
        localStorage.setItem('password', password ?? '');
        router.push('/register');
    }

    const onLogin = () => {
        const user = userData.find((u) => u.userName === username);
        if (user) {
            localStorage.setItem('user_id', user.id);
            toast.success("Logged in!", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            router.push('/home');
            return;
        
        }
    }

    const resolveEnterKey = (key: string) => {
        if (key === 'Enter') {
            onLogin();
        }
    }

    const resolveLoginButton = () => {
        if (isLogin) {
            return (
                <Button css={{ marginBottom: "2em" }} onClick={onLogin}>
                    Login
                </Button>
            )
        }
    }

    const resolveRegisterFields = () => {
        if (isLogin) {
            return;
        }
        return (
            <>
                <Input
                    underlined
                    labelPlaceholder="Name"
                    value={name}
                    fullWidth
                    css={{ marginBottom: "2em" }}
                    onChange={(event) => handleName(event.target.value)}
                    onKeyDown={(event) => resolveEnterKey(event.key)}
                />
                <Input
                    underlined
                    labelPlaceholder="Lastname"
                    value={lastname}
                    fullWidth
                    css={{ marginBottom: "2em" }}
                    onChange={(event) => handleLastname(event.target.value)}
                    onKeyDown={(event) => resolveEnterKey(event.key)}
                />
            </>
        )
    }

    const resolveLoginStuff = () => {
        return (
            <Grid.Container xs={8} css={{ marginRight: "4em" }}>
                {resolveRegisterFields()}
                <Input
                    underlined
                    labelPlaceholder="Username"
                    value={username ?? undefined}
                    fullWidth
                    css={{ marginBottom: "2em" }}
                    onChange={(event) => handleUsername(event.target.value)}
                    onKeyDown={(event) => resolveEnterKey(event.key)}
                />
                <Input
                    underlined
                    type="password"
                    labelPlaceholder="Password"
                    value={password ?? undefined}
                    fullWidth
                    css={{ marginBottom: "2em" }}
                    onChange={(event) => handlePassword(event.target.value)}
                    onKeyDown={(event) => resolveEnterKey(event.key)}
                />
                <Grid.Container direction="column" alignItems="center">
                    {resolveLoginButton()}
                    <Button onClick={onRegister} className={ styles.homeContainerButton } css={{color: 'Black', backgroundColor: '$secondary', marginBottom: "2em"}}>
                        Register
                    </Button>
                    <a style={{ color: "gray" }}><u>Forgot your password?</u></a>
                </Grid.Container>
            </Grid.Container>
        )
    }

    const handleGmailStuff = () => {
        return (
            <Grid.Container xs={6} direction="column" alignItems="center">
                <Button onClick={() => router.push('https://mail.google.com/')} size="lg" className={ styles.homeContainerButton } css={{color: 'Black', backgroundColor: '$secondary', marginBottom: "2em", width: "100%" }}>
                    <img src={google.src} width="20px" style={{ marginRight: "2em" }}/>
                    Continue with Google
                </Button>
                <Button onClick={() => router.push('https://www.facebook.com/')} size="lg" className={ styles.homeContainerButton } css={{color: 'Black', backgroundColor: '$secondary', marginBottom: "2em", width: "100%" }}>
                    <img src={facebook.src} width="20px" style={{ marginRight: "2em" }}/>
                    Continue with FaceBook
                </Button>
            </Grid.Container>
        )
    }

    return (
        <Grid.Container justify="center">
            <Grid.Container xs={8} justify="center" css={{ backgroundColor: "$background_secondary", padding: "5em", margin: "5em" }}>
                <Text h2>Welcome Back!</Text>
                <Grid.Container alignItems="center">
                    <Grid.Container xs={5.75} direction="column" alignItems="center">
                        {resolveLoginStuff()}
                    </Grid.Container>
                    <Grid.Container xs={0.5} direction="column" alignItems="center">
                        <Grid css={{ borderLeft: "2px solid white", height: "130px" }}/>
                        <Text>Or</Text>
                        <Grid css={{ borderLeft: "2px solid white", height: "130px" }}/>
                    </Grid.Container>
                    <Grid.Container xs={5.75} direction="column" alignItems="center">
                        {handleGmailStuff()}
                    </Grid.Container>
                </Grid.Container>
            </Grid.Container>
        </Grid.Container>
    )
}

export default LoginForm;
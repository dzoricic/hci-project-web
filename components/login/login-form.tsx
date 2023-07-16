import { Button, Grid, Input, Text } from "@nextui-org/react";
import { userData } from "fake-data";
import { facebook, google } from "icons";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { useUserContext } from "common/user-context/use-user-context";
import styles from "./login.module.scss";
import { SecondaryButton } from "components/button/secondary-button";
import { PrimaryButton } from "components/button/primary-button";
import Image from "next/image";

interface Props {
    isLogin?: boolean;
}

const LoginForm = ({ isLogin }: Props) => {
    const [email, setEmail] = React.useState<string | null>();
    const [password, setPassword] = React.useState<string | null>();
    const [name, setName] = React.useState<string>();
    const [lastname, setLastname] = React.useState<string>();

    const [emailHelper, setEmailHelper] = React.useState<boolean>(false);
    const [passwordHelper1, setPasswordHelper1] = React.useState<boolean>(false);
    const [passwordHelper2, setPasswordHelper2] = React.useState<boolean>(false);
    const [nameHelper, setNameHelper] = React.useState<boolean>(false);
    const [lastNameHelper, setLastNameHelper] = React.useState<boolean>(false);

    const { login, register } = useUserContext();

    const router = useRouter();

    React.useEffect(function onMount() {
        if (isLogin) {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        } else {
            setEmail(localStorage.getItem('email'));
            setPassword(localStorage.getItem('password'));
        }
    }, [])

    const handleEmail = (value: string) => {
        setEmail(value);
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

    const enableHelperMessages = () => {
        if (!email || email === '') {
            setEmailHelper(true);
        } else setEmailHelper(false);
        if (!password || password === '') {
            setPasswordHelper1(true);
        } else setPasswordHelper1(false);
        if (password && password.length < 6) {
            setPasswordHelper2(true)
        } else setPasswordHelper2(false);
        if (!isLogin) {
            if (!name || name === '') {
                setNameHelper(true);
            } else setNameHelper(false);
            if (!lastname || lastname === '') {
                setLastNameHelper(true);
            } else setLastNameHelper(false);
        }
    }

    const onRegister = () => {
        if (isLogin) {
            localStorage.setItem('username', email ?? '');
            localStorage.setItem('password', password ?? '');
            router.push('/register');
            return;
        }
        register(name, lastname, email, password);
        enableHelperMessages();
    }

    const onLogin = () => {
        login(email, password);
        enableHelperMessages();
    }

    const resolveEnterKey = (key: string) => {
        if (key === 'Enter') {
            isLogin ? onLogin() : onRegister();
        }
    }

    const resolveLoginButton = () => {
        if (isLogin) {
            return <PrimaryButton isWide={true} text="Login" onClick={onLogin}/>
        }
    }

    const resolveRegisterFields = () => {
        if (isLogin) {
            return;
        }
        return (
            <>
                <Input
                    labelPlaceholder="Name"
                    value={name}
                    fullWidth
                    css={{ marginBottom: "3em" }}
                    onChange={(event) => handleName(event.target.value)}
                    onKeyDown={(event) => resolveEnterKey(event.key)}
                    helperText= {nameHelper ? "Please provide a name" : undefined}
                    helperColor="warning"
                />
                <Input
                    labelPlaceholder="Lastname"
                    value={lastname}
                    fullWidth
                    css={{ marginBottom: "3em" }}
                    onChange={(event) => handleLastname(event.target.value)}
                    onKeyDown={(event) => resolveEnterKey(event.key)}
                    helperText= {lastNameHelper ? "Please provide a last name" : undefined}
                    helperColor="warning"
                />
            </>
        )
    }

    const resolveLoginStuff = () => {
        return (
            <div className={styles.loginForm}>
                { resolveRegisterFields() }
                <Input
                    labelPlaceholder="Email"
                    value={email ?? undefined}
                    fullWidth
                    css={{ marginBottom: "3em" }}
                    onChange={(event) => handleEmail(event.target.value)}
                    onKeyDown={(event) => resolveEnterKey(event.key)}
                    helperText= {emailHelper ? "Please provide an email" : undefined}
                    helperColor="warning"
                />
                <Input
                    type="password"
                    labelPlaceholder="Password"
                    value={password ?? undefined}
                    fullWidth
                    css={{ marginBottom: "3em" }}
                    onChange={(event) => handlePassword(event.target.value)}
                    onKeyDown={(event) => resolveEnterKey(event.key)}
                    helperText= {passwordHelper1 ? "Please provide a password" : (passwordHelper2 ? "Must contain at least 6 characters" : undefined)}
                    helperColor="warning"
                />
                <div className={styles.actions}>
                    { resolveLoginButton() }
                    <SecondaryButton isWide={true} text="Register" onClick={onRegister}/>
                    <a style={{ color: "gray" }}><u>Forgot your password?</u></a>
                </div>
            </div>
        )
    }

    const handleGmailStuff = () => {
        return (
            <div className={styles.actions}>
                <SecondaryButton text="Continue with Google" isWide={true}>
                    <Image alt="Google icon" src={google} style={{ marginRight: "1em", width: "20px" }} width="20"/>
                    </SecondaryButton>
                <SecondaryButton text="Continue with FaceBook" isWide={true}>
                    <Image alt="Google icon" src={facebook} style={{ marginRight: "1em", width: "20px" }} width="20"/>
                </SecondaryButton>
            </div>
        )
    }

    return (
        <div className={styles.main}>
            <div className={styles.formContainer}>
                <span className={styles.mobileTitle}>Welcome Back!</span>
                { resolveLoginStuff() }
                <div className={styles.divider}>
                    <span className={styles.title}>Welcome Back!</span>
                    <div className={styles.dividerLine}/>
                    <span>Or</span>
                    <div className={styles.dividerLine}/>
                </div>
                <div className={styles.loginForm}>
                    <div>{ handleGmailStuff() }</div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
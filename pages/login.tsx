import { Grid } from "@nextui-org/react";
import { PageWrapper } from "components";
import LoginForm from "components/login/login-form";
import React from "react";

const Login = () => {
    return (
        <PageWrapper>
            <Grid.Container justify="center">
                <LoginForm isLogin/>
            </Grid.Container>
        </PageWrapper>
    )
}

export default Login;
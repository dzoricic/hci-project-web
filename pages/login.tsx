import { Grid } from "@nextui-org/react";
import { PageWrapper } from "components";
import LoginForm from "components/login/login-form";
import React from "react";

const Login = () => {
    return (
        <PageWrapper>
            <LoginForm isLogin={true}/>
        </PageWrapper>
    )
}

export default Login;
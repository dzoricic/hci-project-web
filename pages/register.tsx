import { Grid } from "@nextui-org/react";
import { PageWrapper } from "components";
import LoginForm from "components/login/login-form";

const Register = () => {
    return (
        <PageWrapper>
            <Grid.Container justify="center">
                <LoginForm/>
            </Grid.Container>
        </PageWrapper>
    )
}

export default Register;
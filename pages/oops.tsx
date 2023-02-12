import { Button, Grid, Text } from "@nextui-org/react";
import { PageWrapper } from "components";
import { useRouter } from "next/router";

const Oops = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    }

    return (
        <PageWrapper>
            <Grid.Container direction="column" alignItems="center" justify="center">
                <Text h1 css={{margin: "3em"}}>Something went wrong</Text>
                <Button onClick={handleGoBack}>Go back</Button>
            </Grid.Container>
        </PageWrapper>
    )
}

export default Oops;
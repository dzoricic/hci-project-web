import { Grid, Text, Input, Button } from "@nextui-org/react";
import styles from "styles/home-page.module.scss";
import { useRouter } from "next/router";
import { left_arrow } from "icons";
import Image from "next/image";

const FakeCheckout = () => {
    const router = useRouter();
    // snackbar

    const onBuy = () => {
        // openSuccessSnackbar("Thank your for your purchase!");
        router.push("/home");
    }

    return (
        <Grid.Container justify="center" alignItems="center" css={{ padding: "5em" }}>
            <Grid.Container direction="column" xs={6} css={{ backgroundColor: "$background_secondary", padding: "3em" }}>
                <Grid.Container justify="space-between" alignItems="center" css={{ marginBottom: "2em" }}>
                    <Text h1 css={{ margin: 0, padding: 0 }}>Checkout</Text>
                    <Grid.Container xs={2} justify="flex-end" alignItems="center" onClick={() => router.back()} css={{ cursor: "pointer" }}>
                        <Image alt="Left arrow icon" src={left_arrow} width="10" height="15" style={{ marginRight: "1em" }}/>
                        <Text h4 css={{ padding: 0, margin: 0 }}>Back</Text>
                    </Grid.Container>
                </Grid.Container>
                <Input
                    underlined
                    labelPlaceholder="Name"
                    fullWidth
                    css={{ marginBottom: "2em" }}
                />
                <Input
                    underlined
                    labelPlaceholder="Lastname"
                    fullWidth
                    css={{ marginBottom: "2em" }}
                />
                <Input
                    underlined
                    labelPlaceholder="Card Number"
                    fullWidth
                    css={{ marginBottom: "2em" }}
                />
                <Input
                    underlined
                    labelPlaceholder="Date"
                    fullWidth
                    css={{ marginBottom: "2em" }}
                />
                <Input
                    underlined
                    labelPlaceholder="Security Number"
                    fullWidth
                    css={{ marginBottom: "2em" }}
                />
                <Button onClick={onBuy} className={ styles.homeContainerButton } css={{color: 'Black', backgroundColor: '$secondary', marginBottom: "2em"}}>
                    Complete purchase
                </Button>
            </Grid.Container> 
        </Grid.Container>
    )
}

export default FakeCheckout;
import { Grid, Text } from "@nextui-org/react";

import { HomeTitle } from "typings";
import styles from "styles/home-page.module.scss";

import { rectangle } from "icons";

interface Props {
    homeTitle: HomeTitle
}

const HomeTitle = ({ homeTitle }: Props) => {
    return (
        <Grid.Container direction="column" alignItems="center">
            <Grid xs={10} md={6} direction="column" alignItems="center">
                <Text h2 css={{ margin: '3em 0 2em 0' }}>{homeTitle.title}</Text>
                <img src={rectangle.src} width="50px"/>
                <Text className={styles.textDecoration} css={{ margin: '4em 0', lineHeight: '3em' }}>{homeTitle.text}</Text>
            </Grid>
        </Grid.Container>
    )
}

export default HomeTitle;
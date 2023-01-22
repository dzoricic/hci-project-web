import { Button, Grid, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

import styles from "styles/header.module.scss";

import { DefaultContainerItem } from "typings";

interface Props {
    titlePicture: DefaultContainerItem;
    isHomeTitle?: boolean;
}

const TitlePicture = ({ titlePicture, isHomeTitle }: Props) => {
    const router = useRouter();

    const paddingXS = isHomeTitle ? 2 : 1;
    const paddingMD = isHomeTitle ? 3 : 2;
    const titleWidth = isHomeTitle ? 6 : 8;

    const resolveButton = (text?: string, link?: string) => {
        if (text && link) {
            return (
                <Button 
                    auto 
                    onClick={() => router.push(link)} 
                    css={{color: "White", backgroundColor: '$primary', borderRadius: '0.5em', marginTop: '4em' }}
                    className={styles.reservation_button}
                >
                    {text}
                </Button>
            )
        }
    }

    return (
        <Grid.Container css={{ position: 'relative' }}>
            <img src={titlePicture.imageSource}/>
            <Grid.Container direction="row" css={{ position: 'absolute', height: '100%' }}>
                <Grid xs={paddingXS} md ={paddingMD}/>
                <Grid xs={10} md={titleWidth} direction="column" justify="flex-end" alignItems="flex-start">
                    <Text h1 css={{ margin: '0', fontSize: '4em' }}>{titlePicture.title}</Text>
                    <Grid css={{ margin: '1em 0 3em 0', height: '30%' }}>
                        <Text h3 css={{ lineHeight: '2.5em', width: '70% '}}>{titlePicture.text}</Text>
                        { resolveButton(titlePicture.buttonText, titlePicture.navigationLink) }
                    </Grid>
                </Grid>
            </Grid.Container>
        </Grid.Container>
    )
}

export default TitlePicture;
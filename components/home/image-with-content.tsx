import { Button, Grid, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

import { DefaultContainerItem } from "typings";
import styles from "styles/home-page.module.scss";

interface Props {
    homeItem: DefaultContainerItem
    isImageOnLeft?: boolean;
}

const ImageWithContent = ({ homeItem, isImageOnLeft }: Props) => {
    const router = useRouter();

    const resolveButton = (text?: string, link?: string) => {
        if (text && link) {
            return (
                <Button
                    auto
                    size='xl'
                    onClick={() => router.push(link)}
                    css={{color: 'Black', backgroundColor: '$secondary'}}
                    className={styles.homeContainerButton}
                >{text}</Button>
            )
        }
    }

    const renderContent = () => {
        return (
            <Grid xs={12} md={4.5} direction="column" justify="space-between" alignItems="center" css={{padding: '6em 3em', backgroundColor: '$background_secondary'}}>
                <Text h1 css={{ textAlign: "center" }}>{homeItem.title}</Text>
                <Text css={{lineHeight: '3em', fontSize: '1.2em', padding: "0 3em", textAlign: "center"}}>{homeItem.text}</Text>
                { resolveButton(homeItem.buttonText, homeItem.navigationLink) }
            </Grid>
        )
    }

    const renderImage = () => {
        return (
            <Grid xs={12} md={7.5}>
                <img src={homeItem.imageSource}/>
            </Grid>
        )
    }

    const resolveImageSide = () => {
        if (isImageOnLeft) {
            return (
                <Grid.Container direction="row" css={{ margin: '6em 0' }}>
                    {renderImage()}
                    {renderContent()}
                </Grid.Container>
            )
        }
        return (
            <Grid.Container direction="row" css={{ margin: '6em 0' }}>
                {renderContent()}
                {renderImage()}
            </Grid.Container>
        )
    }

    return resolveImageSide()
}

export default ImageWithContent;
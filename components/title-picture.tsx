import { Grid, Text } from "@nextui-org/react";

import { TitlePicture } from "typings";

interface Props {
    titlePicture: TitlePicture;
}

const TitlePicture = ({ titlePicture }: Props) => {
    return (
        <Grid.Container css={{ position: 'relative' }}>
            <img src={titlePicture.imageSource}/>
            <Grid.Container direction="row" css={{ position: 'absolute', height: '100%' }}>
                <Grid xs={1} md ={2}/>
                <Grid xs={10} md={8} direction="column" justify="flex-end" alignItems="flex-start">
                    <Text h1 css={{ margin: '0' }}>{titlePicture.title}</Text>
                    <Text h3 css={{ margin: '1em 0 3em 0', lineHeight: '2.5em', height: '20%'}}>{titlePicture.text}</Text>
                </Grid>
            </Grid.Container>
        </Grid.Container>
    )
}

export default TitlePicture;
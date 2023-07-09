import { Grid } from "@nextui-org/react";

import { PageWrapper } from "components";
import { Page } from "enums";
import TitlePicture from "components/title/title-picture";

import { titlePictureData } from "utils";
import { offers } from "icons";

const Offers = () => {
    return (
        <PageWrapper>
            <main>
                <TitlePicture picture={titlePictureData[Page.DRINK_OFFER]}/>
                <Grid.Container direction="column" alignItems="center" css={{ padding: '5em' }}>
                    <img src={offers.src}/>
                </Grid.Container>
            </main>
        </PageWrapper>
    )
}

export default Offers;
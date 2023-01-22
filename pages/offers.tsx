import { PageWrapper } from "components";
import { titlePictureData } from "utils";
import { Page } from "enums";

import TitlePicture from "components/title-picture";

const Offers = () => {
    return (
        <PageWrapper>
            <main>
                <TitlePicture titlePicture={titlePictureData[Page.DRINK_OFFER]}/>
            </main>
        </PageWrapper>
    )
}

export default Offers;
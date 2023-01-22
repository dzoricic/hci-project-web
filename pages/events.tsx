import { PageWrapper } from "components";
import { Page } from "enums";
import { titlePictureData } from "utils";

import TitlePicture from "components/title-picture";

const Events = () => {
    return (
        <PageWrapper>
            <main>
                <TitlePicture titlePicture={titlePictureData[Page.EVENTS]}/>
            </main>
        </PageWrapper>
    )
}

export default Events;
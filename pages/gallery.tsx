import { PageWrapper } from "components";
import { Page } from "enums";
import { titlePictureData } from "utils";

import TitlePicture from "components/title-picture";

const Gallery = () => {
    return (
        <PageWrapper>
            <main>
                <TitlePicture titlePicture={titlePictureData[Page.PHOTO_GALLERY]}/>
            </main>
        </PageWrapper>
    )
}

export default Gallery;
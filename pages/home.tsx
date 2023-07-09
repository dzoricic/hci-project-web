import { HomeTitle, ImageWithContent, PageWrapper } from "components";

import { homeItems, homeTitle, titlePictureData } from "utils";

import TitlePicture from "components/title/title-picture";
import { Page } from "enums";

const Home = () => {
    const renderHomeItems = () => {
        return homeItems.map((item, index) => {
            const isImageOnLeft = index % 2 === 0;
            return <ImageWithContent key={index} homeItem={item} isImageOnLeft={isImageOnLeft}/>
        })
    }

    return (
        <PageWrapper>
            <main>
                <TitlePicture picture={titlePictureData[Page.HOME]}/>
                <HomeTitle homeTitleProps={homeTitle}/>
                { renderHomeItems() }
            </main>
        </PageWrapper>
    )
}

export default Home;
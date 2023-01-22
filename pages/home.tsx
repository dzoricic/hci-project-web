import { HomeTitle, ImageWithContent, PageWrapper } from "components";

import { homeItems, homeTitle, titlePictureData } from "utils";

import TitlePicture from "components/title-picture";
import { Page } from "enums";

const Home = () => {
    const renderHomeItems = () => {
        return homeItems.map((item, index) => {
            const isImageOnLeft = index % 2 === 0;
            return <ImageWithContent homeItem={item} isImageOnLeft={isImageOnLeft}/>
        })
    } 

    return (
        <PageWrapper>
            <main>
                <TitlePicture isHomeTitle titlePicture={titlePictureData[Page.HOME]}/>
                <HomeTitle homeTitle={homeTitle}/>
                { renderHomeItems() }
            </main>
        </PageWrapper>
    )
}

export default Home;
import { HomeTitle, ImageWithContent, PageWrapper } from "components";
import { homeItems, homeTitle } from "utils";

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
                <HomeTitle homeTitle={homeTitle}/>
                { renderHomeItems() }
            </main>
        </PageWrapper>
    )
}

export default Home;
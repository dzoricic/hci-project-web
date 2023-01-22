import { ImageWithContent, PageWrapper } from "components";
import { homeItems } from "utils";

const Home = () => {
    const renderHomeItems = () => {
        return homeItems.map((item, index) => {
            console.log(index);
            const isImageOnLeft = index % 2 === 0;
            console.log(isImageOnLeft);
            return <ImageWithContent homeItem={item} isImageOnLeft={isImageOnLeft}/>
        })
    } 

    return (
        <PageWrapper>
            <main>
                { renderHomeItems() }
            </main>
        </PageWrapper>
    )
}

export default Home;
import { PageWrapper } from "components";
import { Page } from "enums";
import TitlePicture from "components/title/title-picture";

import { titlePictureData } from "utils";
import styles from "../styles/offers.module.scss";
import data from "fake-data/drinks.json";
import { DrinkResponse } from "typings";
import EventContainer from "components/events/event-container";
import { useRouter } from "next/router";

const Offers = () => {
    const router = useRouter();
    const menu = data as DrinkResponse;

    const handleClick = (categoryName?: string) => {
        if (!categoryName) {
            return;
        }
        router.push(`category/${categoryName}`);
    }

    return (
        <PageWrapper>
            <main>
                <TitlePicture picture={titlePictureData[Page.DRINK_OFFER]}/>
                <div className={styles.main}>
                    {renderAccordions(menu, handleClick)}
                </div>
            </main>
        </PageWrapper>
    )
}

export default Offers;

const renderAccordions = (menu?: DrinkResponse, onClick?: (categoryName?: string) => void): JSX.Element[] | JSX.Element | undefined => {
    if (!menu) {
        return;
    }
    if (!menu.categories.length) {
        return <div>No data</div>
    }
    return menu.categories.map((category, index) => (
        <EventContainer
            key={index}
            pointer={true}
            onClickWhole={() => onClick?.(category.id)}
            event={{
                id: index.toString(),
                name: category.name,
                imageSource: category.imageSource,
            }}
        />
    ))
}

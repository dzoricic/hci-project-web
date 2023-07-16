import { useRouter } from "next/router";
import styles from "./category.module.scss";
import data from "../../fake-data/drinks.json";
import { Drink } from "typings";
import { PageWrapper } from "components";
import { BackButton } from "components/button/back-button";
import TitlePicture from "components/title/title-picture";
import { Page } from "enums";
import { titlePictureData } from "utils";

const Category = () => {
    const router = useRouter();
    const { categoryId } = router.query;

    if (!categoryId) {
        return <div>Loading...</div>
    }

    const menu = data;
    const category = menu.categories.find((category) => category.id === categoryId);

    if (!category) {
        <div>Category not found...</div>
    }

    return (
        <PageWrapper>
            <>
                <TitlePicture picture={titlePictureData[Page.DRINK_OFFER]}/>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <BackButton text="Back to offers" onClick={() => router.push("/offers")}/>
                        <div className={styles.topic}>
                            <span className={styles.title}>{category?.name}</span>
                            <img className={styles.image} src={category?.imageSource}/>
                        </div>
                    </div>
                    <div className={styles.drinkList}>
                        {renderDrinks(category?.drinks)}
                    </div>
                </div>
            </>
        </PageWrapper>
    )
}

export default Category;

const renderDrinks = (drinks?: Drink[]) => {
    if (!drinks?.length) {
        return <div>No drinks available in this category...</div>
    }
    return drinks.map(renderDrinkRow);
}

const renderDrinkRow = (drink: Drink) => (
    <div className={styles.drinkItem}>
        <div className={styles.description}>
            <span className={styles.descriptionTitle}>{ drink.name }</span>
            <span className={styles.descriptionText}>{ drink.description }</span>
        </div>
        <span className={styles.price}>${ drink.price }</span>
    </div>
)
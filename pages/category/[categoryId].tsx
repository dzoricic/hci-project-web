import { useRouter } from "next/router";
import styles from "./category.module.scss";
import data from "../../fake-data/drinks.json";
import { Drink } from "typings";

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
        <div className={styles.main}>
            <div className={styles.header}>
                <img className={styles.image} src={category?.imageSource}/>
                <span className={styles.title}>{category?.name}</span>
            </div>
            <div className={styles.drinkList}>
                {renderDrinks(category?.drinks)}
            </div>
        </div>
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
    <div className={styles.drinkRow}>
        <img className={styles.drinkImage} src={undefined}/>
        <div className={styles.description}>
            <span className={styles.descriptionTitle}>{ drink.name }</span>
            <span className={styles.descriptionText}>{ drink.description }</span>
        </div>
    </div>
)
import { FooterItem } from "typings";
import styles from "styles/footer.module.scss";
import Image from "next/image";

const FooterItemContainer = ({imageSource, text}: FooterItem) => {
    if (!imageSource || !text) {
        return null;
    }

    return (
        <div className={styles.footerItem}>
            <img alt="Media icon" className={styles.icon} src={imageSource}/>
            <span className={styles.iconText}>{text}</span>
        </div>
    )
}

export default FooterItemContainer;
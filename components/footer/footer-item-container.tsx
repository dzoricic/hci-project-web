import { Grid, Text } from "@nextui-org/react";

import { FooterItem } from "typings";
import styles from "styles/footer.module.scss";

const FooterItemContainer = ({imageSource, text}: FooterItem) => {
    if (!imageSource || !text) {
        return null;
    }

    return (
        <div className={styles.footerItem}>
            <img className={styles.icon} src={imageSource} height='20px' width='20px'/>
            <span className={styles.iconText}>{text}</span>
        </div>
    )
}

export default FooterItemContainer;
import { Grid, Text } from "@nextui-org/react";

import { FooterItem } from "typings";
import styles from "styles/footer.module.scss";

const FooterItemContainer = ({imageSource, text}: FooterItem) => {
    if (!imageSource || !text) {
        return null;
    }

    return (
        <Grid.Container gap={2} direction="row" alignItems="center">
            <img className={styles.icon} src={imageSource} height='20px' width='20px'/>
            <Text className='footer-item__text'>{text}</Text>
        </Grid.Container>
    )
}

export default FooterItemContainer;
import { Grid } from "@nextui-org/react";
import { FooterItemContainer } from "components";

import { FooterItem } from "typings";
import styles from "styles/footer.module.scss";
import { footerItems } from "utils";

import { moon_logo } from "icons";

const Footer = () => {
    const renderFooterItems = (items: FooterItem[]) => {
        return items.map((item) => <FooterItemContainer imageSource={item.imageSource} text={item.text} />)
    }

    const renderFooterHeader = () => {
        return (
            <Grid.Container xs={3} justify="center" css={{ padding: "3em" }}>
                <img src={moon_logo.src}/>
            </Grid.Container>
        )
    }

    const renderFooterContent = () => {
        const length = footerItems.length;
        const columnCount = Math.round(length / 2);

        return (
            <Grid.Container xs={6} gap={3} direction="row" justify="center" alignItems="center" css={{padding: 0, margin: 0}}>
                <Grid direction="column" alignItems="center" md={6} lg={4}>
                    <Grid>
                        {renderFooterItems(footerItems.slice(0, columnCount))}
                    </Grid>
                </Grid>
                <Grid direction="column" alignItems="center" md={6} lg={4}>
                    <Grid>
                        {renderFooterItems(footerItems.slice(columnCount, length))}
                    </Grid>
                </Grid>
            </Grid.Container>
        )
    }

    return (
        <Grid.Container className={styles.background} direction="row">
            {renderFooterHeader()}
            {renderFooterContent()}
        </Grid.Container>
    )
}

export default Footer;
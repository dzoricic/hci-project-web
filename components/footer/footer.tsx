import { Grid } from "@nextui-org/react";
import { FooterItemContainer } from "components";

import { FooterItem } from "typings";
import styles from "styles/footer.module.scss";
import { footerItems } from "utils";

import { moon_logo } from "icons";
import Image from "next/image";

const Footer = () => {
    const renderFooterItems = (items: FooterItem[]) => {
        return items.map((item) => <FooterItemContainer key={item.text} imageSource={item.imageSource} text={item.text} />)
    }

    const renderFooterContent = () => {
        const length = footerItems.length;
        const columnCount = Math.round(length / 2);

        return (
            <div className={styles.footer}>
                <div className={styles.items}>
                    { renderFooterItems(footerItems.slice(0, columnCount)) }
                </div>
                <div className={styles.items}>
                    {renderFooterItems(footerItems.slice(columnCount, length))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.background}>
            <Image alt="Moon bar logo" className={styles.logo} src={moon_logo} width="200"/>
            {renderFooterContent()}
        </div>
    )
}

export default Footer;
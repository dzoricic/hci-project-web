import { useRouter } from "next/router";

import { DefaultContainerItem } from "typings";
import styles from "./iwc.module.scss";
import { SecondaryButton } from "components/button/secondary-button";
import Image from "next/image";

interface Props {
    homeItem: DefaultContainerItem
    isImageOnLeft?: boolean;
}

export const ImageWithContent = ({ homeItem, isImageOnLeft }: Props) => {
    const router = useRouter();

    const onButtonClick = (): void => {
        if (homeItem.navigationLink) {
            router.push(homeItem.navigationLink);
        }
    }

    const renderContent = (): JSX.Element => {
        return (
            <div className={styles.contentContainer}>
                <span className={styles.title}>{homeItem.title}</span>
                <span className={styles.subtitle}>{homeItem.text}</span>
                <SecondaryButton onClick={onButtonClick} text={homeItem.buttonText}/>
            </div>
        )
    }

    return isImageOnLeft ? (
        <div className={styles.containerLeft}>
            <img alt="Home image" className={styles.image} src={homeItem.imageSource}/>
            {renderContent()}
        </div>
    ) : (
        <div className={styles.containerRight}>
            {renderContent()}
            <img alt="Home image" className={styles.image} src={homeItem.imageSource}/>
        </div>
    )
}
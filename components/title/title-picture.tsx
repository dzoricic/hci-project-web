import { useRouter } from "next/router";

import style from "./title.module.scss";

import { DefaultContainerItem } from "typings";
import { PrimaryButton } from "components/button/primary-button";
import { CSSProperties } from "react";

interface Props {
    picture: DefaultContainerItem;
}

const TitlePicture = ({ picture }: Props): JSX.Element => {
    const router = useRouter();

    const backgroundCss: CSSProperties = {
        backgroundImage: `linear-gradient(to bottom, transparent, black 85%), url("${picture.imageSource}")`,
        backgroundSize: 'cover',
    }

    const onClick = (): void => {
        if (picture.navigationLink) {
            router.push(picture.navigationLink);
        }
    }

    return (
        <div className={style.titleContainer} style={backgroundCss}>
            <div className={style.titleContent}>
                <div className={style.textContainer}>
                    <span className={style.title}>{picture.title}</span>
                    <span className={style.subtitle}>{picture.text}</span>
                </div>
                { picture.buttonText && onClick && <PrimaryButton text={picture.buttonText} onClick={onClick}/>}
            </div>
        </div>
    )
}

export default TitlePicture;
import { Grid, Text } from "@nextui-org/react";

import { HomeTitleProps } from "typings";

import { rectangle } from "icons";

import style from "./home-title.module.scss";
import Image from "next/image";

interface Props {
    homeTitleProps: HomeTitleProps
}

export const HomeTitle = ({ homeTitleProps }: Props) => (
    <div className={style.container}>
        <div className={style.content}>
            <span className={style.title}>{homeTitleProps.title}</span>
            <Image alt="Rectangle icon" src={rectangle} className={style.rectangleIcon} width="50"/>
            <span className={style.subtitle}>{homeTitleProps.text}</span>
        </div>
    </div>
)

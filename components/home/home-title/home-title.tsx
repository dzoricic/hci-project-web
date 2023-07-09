import { Grid, Text } from "@nextui-org/react";

import { HomeTitleProps } from "typings";

import { rectangle } from "icons";

import style from "./home-title.module.scss";

interface Props {
    homeTitleProps: HomeTitleProps
}

export const HomeTitle = ({ homeTitleProps }: Props) => (
    <div className={style.container}>
        <div className={style.content}>
            <span className={style.title}>{homeTitleProps.title}</span>
            <img src={rectangle.src} width="50px"/>
            <span className={style.subtitle}>{homeTitleProps.text}</span>
        </div>
    </div>
)

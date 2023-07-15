import { useState } from "react";
import styles from "./accordion.module.scss";

interface Props {
    imageSource?: string;
    text?: string;
}

export const Accordion = ({ imageSource, text, children }: React.PropsWithChildren<Props>): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={styles.accordion}>
            <div className={styles.container} onClick={() => setOpen(value => !value)}>
                <img className={styles.image} src={imageSource}/>
                <span className={styles.text}>{ text }</span>
            </div>
            {open ? children : null}
        </div>
    )
}
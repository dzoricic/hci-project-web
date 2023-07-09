import { Button, Grid, Text } from "@nextui-org/react";
import { EventData } from "typings";
import styles from "./events.module.scss";
import { PrimaryButton } from "components/button/primary-button";

interface Props {
    event: EventData;
    onClick: (id?: string) => void;
    scrollBack: () => void;
    isPastEvent?: boolean
}

const EventContainer = ({ event, onClick, scrollBack, isPastEvent }: Props) => {
    const date = new Date(event.date);
    const formatedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const buttonText = isPastEvent ? 'Check out upcoming events' : 'Make a reservation';

    const handleClick = () => {
        if (isPastEvent) {
            scrollBack();
            return;
        }
        onClick(event.id);
    }

    return (
        <div className={styles.eventBackground}>
            <div className={styles.eventContainer}>
                <img
                    src={event.imageSource}    
                />
                <span className={styles.title}>{event.name}</span>
                <span className={styles.subtitle}>{formatedDate}</span>
                <PrimaryButton text={buttonText} onClick={handleClick}/>
            </div>
        </div>
    )
}

export default EventContainer;
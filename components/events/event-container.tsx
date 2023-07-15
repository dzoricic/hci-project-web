import { EventData } from "typings";
import styles from "./events.module.scss";
import { PrimaryButton } from "components/button/primary-button";

interface Props {
    event: EventData;
    onClick?: (id?: string) => void;
    onClickWhole?: (name?: string) => void;
    scrollBack?: () => void;
    isPastEvent?: boolean;
    pointer?: boolean;
}

const EventContainer = ({ event, onClick, onClickWhole, scrollBack, isPastEvent, pointer }: Props) => {
    const date = event.date ? new Date(event.date) : undefined;
    const formatedDate = date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : undefined;
    const buttonText = isPastEvent ? 'Check out upcoming events' : 'Make a reservation';

    const handleClick = () => {
        if (isPastEvent) {
            scrollBack?.();
            return;
        }
        onClick?.(event.id);
    }

    return (
        <div className={styles.eventBackground} style={ pointer ? { cursor: "pointer" } : undefined }>
            <div className={styles.eventContainer} onClick={() => onClickWhole?.()}>
                <img
                    className={styles.image}
                    src={event.imageSource}    
                />
                <span className={styles.title}>{event.name}</span>
                {formatedDate && <span className={styles.subtitle}>{formatedDate}</span>}
                {onClick && <div className={styles.buttonContainer}><PrimaryButton text={buttonText} onClick={handleClick}/></div>}
            </div>
        </div>
    )
}

export default EventContainer;
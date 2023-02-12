import { Button, Grid, Text } from "@nextui-org/react";
import { EventData } from "typings";
import styles from "styles/header.module.scss";

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
        <Grid xs={6} sm={4} direction="column" alignItems="center" css={{ paddingTop: "5em" }}>
            <Grid direction="column" css={{ backgroundColor: "$background_secondary"}}>
                <img src={event.imageSource}/>
                <Grid.Container direction="column" justify="space-between" alignItems="center" css={{ aspectRatio: 1.5, padding: "1em 0 4em 0" }}>
                    <Text h2>{event.name}</Text>
                    <Text h4 css={{lineHeight: '3em', fontFamily: 'Nobile', color: "gray", letterSpacing: "1px"}}>{formatedDate}</Text>
                    <Button auto flat onClick={handleClick} className={styles.reservation_button} css={{color: "White", backgroundColor: '$primary', borderRadius: '0.5em'}}>
                        {buttonText}
                    </Button>
                </Grid.Container>
            </Grid>
        </Grid>
    )
}

export default EventContainer;
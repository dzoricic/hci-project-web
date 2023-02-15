import { Grid, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { useSnackbar } from "react-simple-snackbar";
import { EventData } from "typings";
import EventContainer from "./event-container";

interface Props {
    events: EventData[];
}

const EventList = ({ events }: Props) => {
    const router = useRouter();
    const [openInfoSnackbar] = useSnackbar({
        style: {
            backgroundColor: "blue"
        }
    });
    const [loggedInId, setLoggedInId] = React.useState<string | null>();
    
    React.useEffect(function onMount() {
        setLoggedInId(localStorage.getItem('user_id'));
    }, [])

    const resolveUpcomingEvents = () => {
        const upcomingEvents = resolveEvents(true);
        return renderEvents(upcomingEvents);
    }

    const resolvePastEvents = () => {
        const pastEvents = resolveEvents(false);
        return renderEvents(pastEvents, true);
    }

    const scrollToUpcomingEvents = () => {
        const scrollItem = document.getElementById('upcoming-events');
        if (!scrollItem) {
            console.log("scroll didnt work...");
            return;
        }
        scrollItem.scrollIntoView({behavior: 'smooth'});
    }

    const navigateToReservation = (id?: string) => {
        if (!loggedInId) {
            openInfoSnackbar("Login or register to make a reservation");
            return;
        }
        if (!id) {
            router.push('oops');
            return;
        }
        router.push(`reservation/${id}`);
    }

    const renderEvents = (events: EventData[], isPastEvent?: boolean) => {
        return events.map((event) => <EventContainer isPastEvent={isPastEvent} event={event} onClick={navigateToReservation} scrollBack={scrollToUpcomingEvents}/>)
    }

    const resolveEvents = (isUpcomingEvent: boolean) => {
        return events
            .filter((event) => {
                try {
                    return isUpcomingEvent
                        ? Date.parse(event.date) > Date.now()
                        : Date.parse(event.date) < Date.now();
                } catch {
                    return !isUpcomingEvent;
                }
            })
            .sort((previousEvent, currentEvent) => {
                try {
                    return Date.parse(previousEvent.date) < Date.parse(currentEvent.date) ? 1 : -1
                } catch {
                    return -1;
                }
            })
    }

    return (
        <Grid.Container direction="column" alignItems="center" css={{ padding: "3em 5em" }}>
            <Grid.Container id='upcoming-events'>
                {resolveUpcomingEvents()}
            </Grid.Container>
            <Grid>
                <Text h2 css={{ padding: "4em 0 2em 0" }}>Past events</Text>
            </Grid>
            <Grid.Container>
                {resolvePastEvents()}
            </Grid.Container>
        </Grid.Container>
    )
}

export default EventList;
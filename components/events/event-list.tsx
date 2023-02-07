import { Grid, Text } from "@nextui-org/react";
import { EventData } from "typings";
import EventContainer from "./event-container";

interface Props {
    events: EventData[];
}

const EventList = ({ events }: Props) => {

    const resolveUpcomingEvents = () => {
        const upcomingEvents = resolveEvents(true);
        return renderEvents(upcomingEvents);
    }

    const resolvePastEvents = () => {
        const pastEvents = resolveEvents(false);
        return renderEvents(pastEvents);
    }

    const renderEvents = (events: EventData[]) => {
        return events.map((event) => <EventContainer event={event} onClick={() => undefined}/>)
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
            <Grid.Container>
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
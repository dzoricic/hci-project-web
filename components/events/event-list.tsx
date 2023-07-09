import { useRouter } from "next/router";
import React from "react";
import { EventData } from "typings";
import EventContainer from "./event-container";
import { useUserContext } from "common/user-context/use-user-context";
import styles from "./events.module.scss";
import { toast } from "react-toastify";

interface Props {
    events: EventData[];
}

const EventList = ({ events }: Props) => {
    const router = useRouter();
    const { user } = useUserContext();

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
        if (!user || !user.id) {
            toast.info("Login to make a reservation.", {
                position: toast.POSITION.BOTTOM_LEFT
            });
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
        <div className={styles.container}>
            <div>
                <span className={styles.dividerTitle}>Check out our lineup</span>
            </div>
            <div id="upcoming-events" className={styles.eventList}>
                {resolveUpcomingEvents()}
            </div>
            <div className={styles.divider}>
                <span className={styles.dividerTitle}>Past events</span>
            </div>
            <div className={styles.eventList}>
                {resolvePastEvents()}
            </div>
        </div>
    )
}

export default EventList;
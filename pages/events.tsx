import { PageWrapper } from "components";
import { Page } from "enums";

import TitlePicture from "components/title-picture";
import EventList from "components/events/event-list";

import { titlePictureData } from "utils";
import { eventData } from "fake-data/event-data";

const Events = () => {
    return (
        <PageWrapper>
            <main>
                <TitlePicture titlePicture={titlePictureData[Page.EVENTS]}/>
                <EventList events={eventData}/>
            </main>
        </PageWrapper>
    )
}

export default Events;
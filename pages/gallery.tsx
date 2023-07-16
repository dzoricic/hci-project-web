import { PageWrapper } from "components";
import styles from "styles/gallery.module.scss";
import { eventData } from "fake-data/event-data";
import EventContainer from "components/events/event-container";
import { useRouter } from "next/router";
import { gallery as data, galleryList, titlePictureData } from "utils";
import TitlePicture from "components/title/title-picture";
import { Page } from "enums";

const Gallery = () => {
    const router = useRouter();

    const gallery = data;

    const renderEventGallery = () => {
        return eventData.filter((event) => event.date ? Date.parse(event.date) < Date.now() : false)
                        .map((event, index) => {
                            const eventPhotoPair = gallery?.filter((item) => item.eventId === event.id);
                            const photoCount = galleryList?.filter((item) => eventPhotoPair?.find((pair) => pair.pictureId === item.id)).length;
                            return <EventContainer key={index} event={{
                                id: event.id,
                                imageSource: event.imageSource,
                                name: event.name,
                                description: mapPhotoCountToLabel(photoCount)
                            }} onClickWhole={() => router.push(`/gallery/${event.id}`)} pointer={true}/>
                        })
    }

    return (
        <PageWrapper>
            <>
                <TitlePicture picture={titlePictureData[Page.PHOTO_GALLERY]}/>
                <div className={styles.main}>
                    {renderEventGallery()}
                </div>
            </>
        </PageWrapper>
    )
}

export default Gallery;

const mapPhotoCountToLabel = (count?: number): string => {
    if (!count) {
        return "No photos in album";
    }
    switch (count) {
        case 1:
            return "1 photo in album";
        case 0:
            return "No photos in album";
        default:
            return `${count} photos in album`;
    }
}
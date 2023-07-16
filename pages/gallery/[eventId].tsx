import { Grid } from "@nextui-org/react";
import { GalleryItem, PageWrapper } from "components";
import { BackButton } from "components/button/back-button";
import GalleryModal from "components/gallery/gallery-modal";
import TitlePicture from "components/title/title-picture";
import { Page } from "enums";
import { useRouter } from "next/router";
import { useState } from "react";
import { Gallery, GalleryImage } from "typings";
import { gallery, galleryList, titlePictureData } from "utils";
import styles from "styles/gallery.module.scss";
import { eventData } from "fake-data/event-data";
import eventStyles from "../reservation/event.module.scss";

const Photos = () => {
    const router = useRouter();
    const { eventId } = router.query;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeImage, setActiveImage] = useState<GalleryImage | undefined>();

    const event = eventData.find((e) => e.id === eventId);
    const eventPhotoPair: Gallery[] = gallery.filter((pair) => pair.eventId === eventId);
    const eventPhotos: GalleryImage[] = galleryList?.filter((item) => eventPhotoPair?.find((photo) => photo.pictureId === item.id));

    const openModal = (imageId: string) => {
        const galleryItem = eventPhotos.find((item) => item.id === imageId);
        setActiveImage(galleryItem);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const switchImage = (goingLeft: boolean) => {
        if (!activeImage) {
            return;
        }
        const activeIndex = eventPhotos.indexOf(activeImage);
        const listLength = eventPhotos.length;

        if (goingLeft) {
            if (activeIndex === 0) {
                setActiveImage(eventPhotos[listLength - 1]);
                return;
            }
            setActiveImage(eventPhotos[activeIndex - 1]);
            return;
        }
        if (activeIndex === listLength - 1) {
            setActiveImage(eventPhotos[0]);
            return;
        }
        setActiveImage(eventPhotos[activeIndex + 1]);
    }

    const renderGalleryList = () => {
        if (!eventPhotoPair?.length || !event) {
            return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <span style={{ fontSize: "x-large", color: "white", textAlign: "center" }}>This event gallery photos contain sensitive content<br/>and potential nationalist symbols.</span>
            </div>
        }
        return eventPhotos.map((galleryItem) => <GalleryItem key={galleryItem.id} galleryItem={galleryItem} onClick={openModal}/>)
    }

    const renderEvent = () => {
        return (
            <div className={eventStyles.eventContainer}>
                <BackButton text="Back to gallery" onClick={() => router.push("/gallery")}/>
                <div className={eventStyles.eventInfo}>
                    <span className={eventStyles.eventName}>{event?.name}</span>
                    <img className={eventStyles.eventImage} src={event?.imageSource}/>
                </div>
            </div>
        )
    }

    return (
        <PageWrapper>
            <main>
                <TitlePicture picture={titlePictureData[Page.PHOTO_GALLERY]}/>
                <div className={styles.header}>
                    { renderEvent() }
                </div>
                <div className={styles.main}>
                    { renderGalleryList() }
                </div>
                <GalleryModal galleryItem={activeImage} isOpen={isModalOpen} onClick={closeModal} onSwitchImage={switchImage}/>
            </main>
        </PageWrapper>
    )
}

export default Photos;
import { useState } from "react";
import { Grid } from "@nextui-org/react";

import { GalleryItem, PageWrapper } from "components";
import { Page } from "enums";
import { GalleryImage } from "typings";

import { galleryList, titlePictureData } from "utils";
import TitlePicture from "components/title-picture";
import GalleryModal from "components/gallery/gallery-modal";

const Gallery = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeImage, setActiveImage] = useState<GalleryImage | undefined>();

    const openModal = (imageId: string) => {
        const galleryItem = galleryList.find((item) => item.id === imageId);
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
        const activeIndex = galleryList.indexOf(activeImage);
        const listLength = galleryList.length;

        if (goingLeft) {
            if (activeIndex === 0) {
                setActiveImage(galleryList[listLength - 1]);
                return;
            }
            setActiveImage(galleryList[activeIndex - 1]);
            return;
        }
        if (activeIndex === listLength - 1) {
            setActiveImage(galleryList[0]);
            return;
        }
        setActiveImage(galleryList[activeIndex + 1]);
    }

    const renderGalleryList = () => {
        return galleryList.map((galleryItem) => <GalleryItem galleryItem={galleryItem} onClick={openModal}/>)
    }

    return (
        <PageWrapper>
            <main>
                <TitlePicture titlePicture={titlePictureData[Page.PHOTO_GALLERY]}/>
                <Grid.Container css={{ padding: '5em' }}>
                    { renderGalleryList() }
                </Grid.Container>
                <GalleryModal galleryItem={activeImage} isOpen={isModalOpen} onClick={closeModal} onSwitchImage={switchImage}/>
            </main>
        </PageWrapper>
    )
}

export default Gallery;
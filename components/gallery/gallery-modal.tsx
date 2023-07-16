import { Grid, Modal } from "@nextui-org/react";

import { GalleryImage } from "typings";
import { NO_IMAGE_URL } from "utils";
import styles from "styles/gallery.module.scss";

import { left_arrow, right_arrow } from "icons";
import Image from "next/image";

interface Props {
    isOpen: boolean;
    onClick: () => void;
    onSwitchImage: (goingLeft: boolean) => void;
    galleryItem?: GalleryImage;
}

const GalleryModal = ({ isOpen, onClick, onSwitchImage, galleryItem }: Props) => {
    const resolveImageSource = () => {
        if (!galleryItem) {
            return NO_IMAGE_URL;
        }

        return galleryItem.imageSource;
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={isOpen}
            onClose={onClick}
            width="850px"
        >
            <Modal.Body>
                <Grid.Container direction="row" justify="space-between" alignItems="center">
                        <Image alt="Left arrow" src={left_arrow} className={styles.modalPhoto} onClick={() => onSwitchImage(true)} width="20" height="20"/>
                        <img alt="Gallery photo" src={resolveImageSource()} width="700px"/> 
                        <Image alt="Right arrow" src={right_arrow} className={styles.modalPhoto} onClick={() => onSwitchImage(false)} width="20" height="20"/>
                </Grid.Container>
            </Modal.Body>
        </Modal>
    )
}

export default GalleryModal;
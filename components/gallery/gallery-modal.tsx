import { Grid, Modal } from "@nextui-org/react";

import { GalleryImage } from "typings";
import { NO_IMAGE_URL } from "utils";
import styles from "styles/gallery.module.scss";

import { left_arrow, right_arrow } from "icons";

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
                        <img src={left_arrow.src} className={styles.modalPhoto} onClick={() => onSwitchImage(true)}/>
                        <img src={resolveImageSource()} width="700px"/>
                        <img src={right_arrow.src} className={styles.modalPhoto} onClick={() => onSwitchImage(false)}/>
                </Grid.Container>
            </Modal.Body>
        </Modal>
    )
}

export default GalleryModal;
import { Grid } from "@nextui-org/react";

import { GalleryImage } from "typings";
import styles from "styles/gallery.module.scss";
import Image from "next/image";

interface Props {
    galleryItem: GalleryImage;
    onClick: (imageId: string) => void;
}

const GalleryItem = ({ galleryItem, onClick }: Props) => {
    return (
        <div className={styles.container}>
            <img
                alt="Gallery photo"
                src={galleryItem.imageSource}
                className={styles.galleryItem}
                onClick={() => onClick(galleryItem.id)}
            />
        </div>
    )
}

export default GalleryItem;
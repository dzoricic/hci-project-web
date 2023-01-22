import { Grid } from "@nextui-org/react";

import { GalleryImage } from "typings";
import styles from "styles/gallery.module.scss";

interface Props {
    galleryItem: GalleryImage;
    onClick: (imageId: string) => void;
}

const GalleryItem = ({ galleryItem, onClick }: Props) => {
    return (
        <Grid xs={12} sm={4} lg={3} css={{ padding: '2em' }}>
            <img
                src={galleryItem.imageSource}
                className={styles.galleryItem}
                onClick={() => onClick(galleryItem.id)}
            />
        </Grid>
    )
}

export default GalleryItem;
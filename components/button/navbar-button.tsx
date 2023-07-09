import { CSSProperties } from "react";
import styles from "./button.module.scss";

interface NavbarButtonProps {
    onClick?: () => void;
    text?: string;
    isActive?: boolean;
}

export const NavbarButton = ({ onClick, text, isActive }: NavbarButtonProps): JSX.Element => {
    const selectedCss: CSSProperties | undefined = isActive ? {
        borderColor: "#7000FF", // primary
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
    } : undefined

    return (
        <button
            className={styles.navbarButton}
            style={ selectedCss }
            onClick={onClick}
        >
            {text ?? "Button"}
        </button>
    )
}
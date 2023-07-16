import { CSSProperties } from "@material-ui/core/styles/withStyles";
import styles from "./button.module.scss";

interface ButtonProps {
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
    isWide?: boolean;
    isFullWidth?: boolean;
}

export const SecondaryButton = ({ onClick, text, isWide, isFullWidth, disabled, children }: React.PropsWithChildren<ButtonProps>): JSX.Element => (
    <button
        className={styles.secondaryButton}
        onClick={onClick}
        disabled={disabled}
        style={mapWidth(isWide, isFullWidth, disabled)}
    >
        {children}
        {text ?? "Button"}
    </button>
)

const mapWidth = (isWide?: boolean, isFullWidth?: boolean, isDisabled?: boolean): CSSProperties | undefined => {
    if (isDisabled) {
        if (isFullWidth)
            return { width: "100%", display: "flex", justifyContent: "center", opacity: "0.1", cursor: "auto" };
        if (isWide)
            return { width: "70%", display: "flex", justifyContent: "center", opacity: "0.1", cursor: "auto" };
        return { opacity: "0.1", cursor: "auto" }
    }
    if (isFullWidth)
        return { width: "100%", display: "flex", justifyContent: "center"};
    if (isWide)
        return { width: "70%", display: "flex", justifyContent: "center"};
}
import styles from "./button.module.scss";

interface ButtonProps {
    onClick?: () => void;
    text?: string;
    isWide?: boolean;
    isFullWidth?: boolean;
}

export const PrimaryButton = ({ onClick, text, isWide, isFullWidth }: ButtonProps): JSX.Element => (
    <button
        className={styles.primaryButton}
        onClick={onClick}
        style={mapWidth(isWide, isFullWidth)}
    >
        {text ?? "Button"}
    </button>
)

const mapWidth = (isWide?: boolean, isFullWidth?: boolean) => {
    if (isFullWidth)
        return { width: "100%", display: "flex", justifyContent: "center"};
    if (isWide)
        return { width: "70%", display: "flex", justifyContent: "center"};
}
import styles from "./button.module.scss";

interface ButtonProps {
    onClick?: () => void;
    text?: string;
}

export const BackButton = ({ onClick, text }: ButtonProps): JSX.Element => (
    <button
        className={styles.backButton}
        onClick={onClick}
    >
        &larr; {text ?? "Back"}
    </button>
)
import styles from "./button.module.scss";

interface ButtonProps {
    onClick?: () => void;
    text?: string;
}

export const SecondaryButton = ({ onClick, text }: ButtonProps): JSX.Element => (
    <button
        className={styles.secondaryButton}
        onClick={onClick}
    >
        {text ?? "Button"}
    </button>
)
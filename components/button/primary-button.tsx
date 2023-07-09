import styles from "./button.module.scss";

interface ButtonProps {
    onClick?: () => void;
    text?: string;
}

export const PrimaryButton = ({ onClick, text }: ButtonProps): JSX.Element => (
    <button
        className={styles.primaryButton}
        onClick={onClick}
    >
        {text ?? "Button"}
    </button>
)
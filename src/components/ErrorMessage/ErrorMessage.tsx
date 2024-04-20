import { FC } from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.boxError}>
      <p className={styles.text}>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;

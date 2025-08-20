import { FaSpinner } from "react-icons/fa";
import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner color="#FFF" size={16} />
      ) : (
        <a href="#" className={styles.buttonText}>
          {children}
        </a>
      )}
    </button>
  );
}

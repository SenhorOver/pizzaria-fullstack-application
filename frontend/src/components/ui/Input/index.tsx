import styles from "./styles.module.scss";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.input} {...rest} />;
}

export function TextArea({
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={styles.input} {...rest}></textarea>;
}

import styles from "@/styles/check-box.module.scss";

type Props = {
  backgroundColor: string;
  checked: boolean;
};

export default function CheckBox({ backgroundColor, checked }: Props) {
  return (
    <div className={styles.container} style={{ backgroundColor }}>
      {checked ? (
        <span className="material-symbols-outlined">done</span>
      ) : (
        <span className="material-symbols-outlined" />
      )}
    </div>
  );
}

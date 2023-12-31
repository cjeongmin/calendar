import styles from "@/styles/check-box.module.scss";
import { HTMLAttributes } from "react";

type Props = {
  backgroundColor: string;
  checked: boolean;
};

export default function CheckBox({
  backgroundColor,
  checked,
  onClick,
  onDoubleClick,
}: Props & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {checked ? (
        <span className="material-symbols-outlined">done</span>
      ) : (
        <span className="material-symbols-outlined" />
      )}
    </div>
  );
}

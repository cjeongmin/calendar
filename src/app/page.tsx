import styles from "@/styles/app-page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.utils}>
        <div className={styles["add-button"]}>+</div>
        <div className={styles.types}>
          <span>일</span>
          <span>주</span>
          <span>월</span>
          <span>년</span>
        </div>
        <input placeholder={"검색"} className={styles.search} />
      </div>
    </main>
  );
}

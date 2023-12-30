import styles from "@/styles/app-page.module.scss";

export default function Home() {
  const today = new Date();
  const [year, month] = [today.getFullYear(), today.getMonth() + 1];

  return (
    <main className={styles.main}>
      <div className={styles.utils}>
        <button className={styles["add-button"]}>+</button>
        <div className={styles.types}>
          <span>일</span>
          <span>주</span>
          <span>월</span>
          <span>년</span>
        </div>
        <input placeholder={"검색"} className={styles.search} />
      </div>
      <header className={styles.header}>
        <h1>{`${year}년 ${month}월`}</h1>
        <div className={styles.buttons}>
          <button>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <button>
            <div>오늘</div>
          </button>
          <button>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      </header>
    </main>
  );
}
